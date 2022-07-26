import { History } from 'history';
import { Showtime } from 'shared';
import { printDate, printTime } from './stringTool';

export function mapShowtimeCard(name: string, showtime: Showtime, amounts: Record<string, number>, history?: History): CardInfo {
    const date = printDate(showtime.date);
    const location = (showtime.location ? ' - ' + showtime.location : '');
    const seats = Math.max(0, showtime.maxSeats - amounts[showtime.id]);
    const seatText = ' - vain ' + seats + (seats === 1 ? ' paikka jäljellä!' : ' paikkaa jäljellä!');

    return {
        title: name,
        meta: date + location + (seats && seats <= 10 ? seatText : ''),
        tags: showtimeTags(showtime),
        action: history ? () => history.push('/reserve/' + showtime.id) : undefined,
        disabled: !seats,
        disabledMsg: 'Ei paikkoja jäljellä'
    };
}

function showtimeTags(showtime: Showtime) {
    return [
        printTime(showtime.date),
        'Peruslippu ' + showtime.prices.normal + '€',
        'Alennuslippu ' + showtime.prices.discount + '€',
        'Perhelippu ' + showtime.prices.family + '€'
    ];
}