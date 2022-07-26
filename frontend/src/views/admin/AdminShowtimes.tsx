import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Showtime } from 'shared';
import { BackButton } from '../../components/BackButton';
import Card from '../../components/Card';
import CardButtons from '../../components/CardButtons';
import { ConfirmationModal } from '../../components/ConfirmationModal';
import { useNotification } from '../../hooks/useNotification';
import { useRefresh } from '../../hooks/useRefresh';
import { StateType } from '../../store';
import database from '../../tools/database';
import { mapShowtimeCard } from '../../tools/maps';
import NotFound from '../NotFound';

export function AdminShowtimes() {
  const { refreshData } = useRefresh();
  const id = (useParams() as any).id as string;
  const { shows, showtimes } = useSelector((state: StateType) => state.data);
  const [seatAmounts, setSeatAmounts] = useState<Record<string, number>>({});
  const notify = useNotification();
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState<[Showtime, CardInfo] | undefined>();

  useEffect(() => {
    database.tickets.getSeatAmounts()
      .then(setSeatAmounts)
      .catch(err => notify.create('error', err.error ?? err.message ?? 'Unable to fetch seat amount data'));
  }, []);

  const show = shows.find(x => x.id === id);

  if (!show)
    return <NotFound noStrip noButton />;
  const showtimesFiltered = showtimes.filter(x => x.showid.toString() === id);

  const stData: [Showtime, CardInfo][] = showtimesFiltered
    .filter(st => st.showid.toString() === id)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map(st => [st, mapShowtimeCard(show.name, st, seatAmounts)]);

  const deleteShowtime = (data: [Showtime, CardInfo]) => {
    setModalData(data);
    setModal(true);
  };

  const onModal = (confirm: boolean) => {
    setModal(false);
    if (!confirm) {
      setModalData(undefined);
      return;
    }

    if (modalData)
      database.showtimes.delete(modalData[0].id)
        .then(() => refreshData())
        .catch(err => notify.create('error', err.error ?? err.message ?? 'Unable to delete showtime'));
    else
      notify.create('error', 'Unable to delete showtime');
  };

  return (
    <div>
      <ConfirmationModal
        open={modal}
        onInput={onModal}
        title='Delete showtime?'
        text='Are you sure you want to delete this showtime?'
        warning yesNo
      >
        {modalData && <Card data={modalData[1]} />}
      </ConfirmationModal>

      <BackButton text='Back' />
      <div className='ui container'>
        {!stData ? 'No showtimes available' : stData.map(([st, card]) => (
          <Card style={{ marginBottom: 10 }} key={st.id} data={card}>
            <CardButtons aDelete={() => deleteShowtime([st, card])} />
          </Card>
        ))}
      </div>
    </div>
  );
}
