import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUser extends Document {
    _id: Types.ObjectId;
    name: string
    email: string
    password: string
}   

const UserSchema: Schema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
    }
);

export const User = mongoose.model<IUser>('User', UserSchema);
export default User;