import React, { useState } from 'react';
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

  return (
    <div>
      <ConfirmationModal
        open={modal}
        onInput={onModal}
        title='Delete show?'
        text='Are you sure you want to delete this show?'
        warning yesNo
      >
        {modalData && <Card data={modalData[1]} style={{ width: 500 }} />}
      </ConfirmationModal>

      <div className='ui container'>
        {!showData ? 'No shows available' : showData.map(([show, card]) => (
          <Card style={{ marginBottom: 10 }} key={show.id} data={card} onClick={card.action}>
            <CardButtons
              // aEdit={() => console.log('Edit pressed')}
              // aHide={() => console.log('Hide pressed')}
              aDelete={() => deleteShow([show, card])}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}
