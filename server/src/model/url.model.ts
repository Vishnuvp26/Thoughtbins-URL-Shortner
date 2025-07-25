import mongoose, { Schema, Document } from 'mongoose';

export interface IUrl extends Document {
    originalUrl: string;
    shortCode: string;
    userId: mongoose.Types.ObjectId;
    createdAt: Date;
    expiresAt: Date;
    clickCount: number;
    geoData: {
        ip: string;
        country: string;
        time: Date;
    }[];
}

const urlSchema = new Schema<IUrl>({
    originalUrl: {
        type: String,
        required: true
    },
    shortCode: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiresAt: {
        type: Date,
        required: true
    },
    clickCount: {
        type: Number,
        default: 0
    },
    geoData: [
        {
            ip: String,
            country: String,
            time: { type: Date, default: Date.now },
        },
    ],
});

urlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Url = mongoose.model<IUrl>('Url', urlSchema);
export default Url;