import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Show } from 'shared';
import Card from '../../components/Card';
import CardButtons from '../../components/CardButtons';
import { ConfirmationModal } from '../../components/ConfirmationModal';
import { useNotification } from '../../hooks/useNotification';
import { useRefresh } from '../../hooks/useRefresh';
import { StateType } from '../../store';
import database from '../../tools/database';
import { showMapper } from '../Homepage';

export default function AdminShows() {
  const { refreshData } = useRefresh();
  const history = useHistory();
  const { shows, showtimes, misc } = useSelector((state: StateType) => state.data);
  const tickets = useSelector((state: StateType) => state.admin.tickets);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState<[Show, CardInfo] | undefined>();
  const notify = useNotification();

  const showData = showMapper(shows, showtimes, misc);
  showData.forEach(([show, card]) => {
    card.action = () => history.push(`/admin/show/${show.id}`);
  });

  const deleteShow = (data: [Show, CardInfo]) => {
    setModalData(data);
    setModal(true);
  };

  const hideShow = (show: Show, state: boolean) => {
    database.shows.setHidden(show.id, state)
      .then(() => {
        refreshData();
        notify.create('info', `${show.name} is now ${state ? 'hidden' : 'visible'}`);
      }).catch(e => {
        notify.create('error', e.error ?? 'Failed to hide show');
      });
  };

  const onModal = (confirm: boolean) => {
    setModal(false);
    if (!confirm) {
      setModalData(undefined);
      return;
    }

    if (modalData)
      database.shows.delete(modalData[0].id)
        .then(() => refreshData())
        .catch(err => notify.create('error', err.error ?? err.message ?? 'Unable to delete show'));
    else
      notify.create('error', 'Unable to delete show');
  };

  const affectedSt = showtimes.reduce((sum, st) => sum + (st.showid.toString() === modalData?.[0].id ? 1 : 0), 0);
  const affectedTi = tickets.reduce((sum, t) => {
    const st = showtimes.find(x => x.id === t.showtimeid.toString());
    if (st?.showid.toString() === modalData?.[0].id)
      return sum + 1;
    return sum;
  }, 0);

  return (
    <div>
      <ConfirmationModal
        open={modal}
        onInput={onModal}
        title='Delete show?'
        text={`This will also delete ${affectedSt} showtime${affectedSt === 1 ? '' : 's'} and ${affectedTi} ticket${affectedTi === 1 ? '' : 's'} associated with this show`}
        warning yesNo
      >
        {modalData && <Card data={modalData[1]} style={{ width: 500 }} />}
      </ConfirmationModal>

      <div className='ui container'>
        {!showData ? 'No shows available' : showData.map(([show, card]) => (
          <Card style={{ marginBottom: 10 }} key={show.id} data={card} onClick={card.action}>
            <CardButtons
              eyeSlash={show.hidden}
              aHide={() => hideShow(show, !show.hidden)}
              aDelete={() => deleteShow([show, card])}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}
