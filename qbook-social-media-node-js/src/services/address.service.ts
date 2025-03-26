import addressSchema from '../models/address.schema';
import userService from './user.service';

class AddressService {
    async getAddressByUser(userId: string) {
        const user = await userService.getUserById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        const address = await addressSchema.findOne({ userId }).exec();

        return address;
    }

    async createAddressForUser(userId: string, payload: any) {
        const user = await userService.getUserById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        const address = {
            province: payload.province,
            provinceSlug: payload.provinceSlug,
            provinceWithType: payload.provinceWithType,
            district: payload.district,
            districtSlug: payload.districtSlug,
            districtWithType: payload.districtWithType,
            ward: payload.ward,
            wardSlug: payload.wardSlug,
            wardWithType: payload.wardWithType,
            address: payload.address,
            country: payload.country,
        };

        const result = await addressSchema.create(address);

        return result;
    }
}

export default new AddressService();
