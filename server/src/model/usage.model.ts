import mongoose, { Schema, Document } from 'mongoose';

export interface IUserUsage extends Document {
    userId: mongoose.Types.ObjectId;
    urlCountToday: number;
    lastResetDate: Date;
}

const userUsageSchema = new Schema<IUserUsage>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
        index: true
    },
    urlCountToday: {
        type: Number,
        default: 0
    },
    lastResetDate: {
        type: Date,
        default: new Date()
    },
});

export const UserUsage = mongoose.model<IUserUsage>('UserUsage', userUsageSchema);
export default UserUsage;