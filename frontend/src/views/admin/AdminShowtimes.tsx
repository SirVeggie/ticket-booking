import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { BackButton } from '../../components/BackButton';
import Cards from '../../components/Cards';
import { useNotification } from '../../hooks/useNotification';
import { StateType } from '../../store';
import database from '../../tools/database';
import { mapShowtimeCard } from '../../tools/maps';
import NotFound from '../NotFound';

export function AdminShowtimes() {
  const id = (useParams() as any).id as string;
  const { shows, showtimes } = useSelector((state: StateType) => state.data);
  const [seatAmounts, setSeatAmounts] = useState<Record<string, number>>({});
  const notify = useNotification();

  useEffect(() => {
    database.tickets.getSeatAmounts()
      .then(setSeatAmounts)
      .catch(err => notify.create('error', err.error ?? err.message ?? 'Unable to fetch seat amount data'));
  }, []);
  
  const show = shows.find(x => x.id === id);
  
  if (!show)
    return <NotFound />;
  const showtimesFiltered = showtimes.filter(x => x.showid.toString() === id);
  
  const cards = showtimesFiltered
    .filter(st => st.showid.toString() === id)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map(st => mapShowtimeCard(show.name, st, seatAmounts));
  
  return (
    <div>
      <BackButton text='Back' />
      <Cards cards={cards} title='Näytökset' emptyText='Ei tulevia näytöksiä' />
    </div>
  );
}