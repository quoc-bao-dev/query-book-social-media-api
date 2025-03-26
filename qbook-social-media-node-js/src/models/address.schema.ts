import { Document, model, Schema } from 'mongoose';

export interface AddressDocument extends Document {
    province: string;
    provinceSlug: string;
    provinceWithType: string;
    district: string;
    districtSlug: string;
    districtWithType: string;
    ward: string;
    wardSlug: string;
    wardWithType: string;
    address: string;
    country: string;
}
const AddressSchema = new Schema<AddressDocument>(
    {
        province: { type: String, required: true },
        provinceSlug: { type: String, required: true },
        provinceWithType: { type: String, required: true },
        district: { type: String, required: true },
        districtSlug: { type: String, required: true },
        districtWithType: { type: String, required: true },
        ward: { type: String, required: true },
        wardSlug: { type: String, required: true },
        wardWithType: { type: String, required: true },
        address: { type: String, required: true },
        country: { type: String, required: true },
    },
    { timestamps: true }
);

export default model<AddressDocument>('Address', AddressSchema);
