import mongoose from 'mongoose';
import { Show } from 'shared';

const showSchema = new mongoose.Schema<Show>({
    name: {
        type: String,
        required: true
    },
    description: String,
    shortDescription: String,
    color: String,
    imageUrl: String
});

showSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
    }
});

export const ShowModel = mongoose.model<Show>('Show', showSchema);