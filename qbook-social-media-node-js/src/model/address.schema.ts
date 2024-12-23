import { Document, model, Schema } from 'mongoose';

export interface AddressDocument extends Document {
    province: string;
    district: string;
    ward: string;
    address: string;
    country: string;
    latitude: number;
    longitude: number;
}
const AddressSchema = new Schema<AddressDocument>(
    {
        province: { type: String, required: true },
        district: { type: String, required: true },
        ward: { type: String, required: true },
        address: { type: String, required: true },
        country: { type: String, required: true },
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
    },
    { timestamps: true }
);

export default model<AddressDocument>('Address', AddressSchema);
