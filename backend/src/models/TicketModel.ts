import mongoose from 'mongoose';
import { Ticket } from 'shared';

const ticketSchema = new mongoose.Schema<Ticket>({
    showtimeid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Showtime',
        required: true
    },
    confirmed: {
        type: Boolean,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    reserveDate: {
        type: Date,
        required: true
    },
    phonenumber: {
        code: {
            type: String,
            required: true
        },
        number: {
            type: String,
            required: true
        }
    },
    seats: {
        normal: {
            type: Number,
            required: true
        },
        discount: {
            type: Number,
            required: true
        },
        family: {
            type: Number,
            required: true
        }
    },
    arrived: {
        type: Boolean,
        required: true
    },
    comment: String
});

ticketSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
    }
});

export const TicketModel = mongoose.model<Ticket>('Ticket', ticketSchema);