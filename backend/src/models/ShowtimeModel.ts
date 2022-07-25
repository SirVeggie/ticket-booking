import mongoose from 'mongoose';
import { Showtime } from 'shared';

const showtimeSchema = new mongoose.Schema<Showtime>({
    showid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Show',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    maxSeats: {
        type: Number,
        required: true
    },
    prices: {
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
    }
});

showtimeSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
    }
});

export const ShowtimeModel = mongoose.model<Showtime>('Showtime', showtimeSchema);