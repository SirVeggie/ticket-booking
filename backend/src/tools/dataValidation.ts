import { extractType, Show, showModel, Showtime, showtimeModel, sumTickets, Ticket, ticketModel } from 'shared';
import database from '../database';

export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export function valError(message: string): ValidationError {
    return new ValidationError(message);
}

export function validateShow(data: unknown): Omit<Show, 'id'> {
    let show = extractType(data, showModel);
    show = fixDates(show);
    
    show.name = validateString(show.name, 'name');
    
    if (show.name.length < 3)
        throw new Error('Show name must be at least 3 characters long');
    
    return show;
}

export async function validateShowtime(data: unknown): Promise<Omit<Showtime, 'id'>> {
    let showtime = extractType(data, showtimeModel);
    showtime = fixDates(showtime);
    
    showtime.location = validateString(showtime.location, 'location');
    
    if (await database.shows.get(showtime.showid.toString()).then(() => false).catch(() => true))
        throw valError('Show ID provided was invalid');
    if (showtime.date instanceof Date === false)
        throw valError('Date provided was invalid');
    if (showtime.location.length < 3)
        throw valError('Showtime location must be at least 3 characters long');
    if (!isPositive(showtime.maxSeats))
        throw valError('Max seats must be a positive number');
    if (!isPositive(showtime.prices.normal))
        throw valError('Normal price must be a positive number');
    if (!isPositive(showtime.prices.discount))
        throw valError('Discount price must be a positive number');
    if (!isPositive(showtime.prices.family))
        throw valError('Family price must be a positive number');
    
    return showtime;
}

export async function validateTicket(data: unknown): Promise<Omit<Ticket, 'id'>> {
    let ticket = extractType(data, ticketModel);
    ticket = fixDates(ticket);
    
    ticket.name = validateString(ticket.name, 'name');
    ticket.email = validateString(ticket.email, 'email');
    try {
        ticket.comment = validateString(ticket.comment, 'comment');
    } catch {
        ticket.comment = undefined;
    }
    
    if (await database.showtimes.get(ticket.showtimeid.toString()).then(() => false).catch(() => true))
        throw valError('Showtime ID provided was invalid');
    if (!isBoolean(ticket.confirmed))
        throw valError('Confirmed must be a boolean');
    if (ticket.reserveDate instanceof Date === false)
        throw valError('Reserve date provided was invalid');
    if (!isString(ticket.phonenumber.code) || !isString(ticket.phonenumber.number))
        throw valError('Phone number provided was invalid');
    if (sumTickets(ticket.seats) < 1)
        throw valError('Must reserve at least 1 seat');
    
    return ticket;
}

export function fixDates(data: any) {
    for (const key of Object.keys(data)) {
        const value = data[key];
        if (typeof value === 'string' && isDate(value)) {
            data[key] = new Date(value);
        } else if (typeof value === 'object') {
            data[key] = fixDates(value);
        }
    }
    
    return data;
}

export function isDate(string: string): boolean {
    return /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/.test(string);
}

export function isNumber(value: unknown): value is number {
    return typeof value === 'number';
}

export function isPositive(value: unknown): value is number {
    return isNumber(value) && value > 0;
}

export function isString(value: unknown): value is string {
    return typeof value === 'string';
}

export function validateString(value: unknown, cause: string): string {
    if (!isString(value))
        throw valError(`Value provided was not a string: ${cause}`);
    const trimmed = value.trim();
    if (trimmed.length === 0)
        throw valError(`Value cannot be empty: ${cause}`);
    return trimmed;
}

export function isBoolean(value: unknown): value is boolean {
    return typeof value === 'boolean';
}