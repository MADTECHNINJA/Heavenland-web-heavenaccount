import axios from 'axios';
import { SubPath, Path } from '@/api/resources';
import { Avatar, Building, AvatarSchema, BuildingSchema } from '~/types/Inventory.types';
import { z } from 'zod';
import { NftScheme, NftData } from '~/types/Nft.types';
import { APIResponse } from '~/api/types';
import { Paragon } from '~/types/Paragon.types';

class InventoryService {
    async getUserAvatars(): Promise<Avatar[]> {
        const data = (await axios.get(`${import.meta.env.VITE_HL_INVENTORY_URL}/${SubPath.INVENTORY.AVATARS}`)).data;

        return z.array(AvatarSchema).parse(data);
    }

    async getUserBuildings(): Promise<Building[]> {
        const data = (await axios.get(`${import.meta.env.VITE_HL_INVENTORY_URL}/${SubPath.INVENTORY.BUILDINGS}`)).data;

        return z.array(BuildingSchema).parse(data);
    }

    async getUserParagons(accountId: string): Promise<APIResponse<Paragon[]>> {
        const data = (await axios.get(`${Path.INVENTORY_ACCOUNTS}/${accountId}/${SubPath.INVENTORY.PARAGONS}`)).data;

        z.object({
            items: z.array(NftScheme),
            totalCount: z.number(),
        }).parse(data);

        data.items = data.items.map((i: NftData) => new Paragon(i));

        return data;
    }
}

export default new InventoryService();
