import { Path, SubPath } from '@/api/resources';
import axios from 'axios';
import { Nft, NftScheme } from '~/types/Nft.types';

export type ImageAddress = { resource: ImageResource; address?: string };

export enum ImageResource {
    TOKEN,
    URL,
}

export enum ImageSize {
    FULL = 'full',
    W500 = 'w500',
}

class NftService {
    getImage(imageAddress: ImageAddress, size?: ImageSize): string {
        let img = null;

        if (!imageAddress.address) {
            throw new Error('invalid: image address');
        }

        switch (imageAddress.resource) {
            case ImageResource.TOKEN:
                img = imageAddress.address;
                break;

            case ImageResource.URL:
                img = 'url:' + encodeURIComponent(imageAddress.address);
                break;

            default:
                throw new Error('invalid: image resource');
        }

        const imgSize = size ?? ImageSize.W500;

        return `${import.meta.env.VITE_HL_API_URL}/${Path.NFTS}/${SubPath.NFTS.IMAGES}/${img}?size=${imgSize}`;
    }

    async getNft(mint?: string): Promise<Nft> {
        if (!mint) {
            throw new Error('invalid: image address');
        }

        const data = (await axios.get(`inventory/${Path.NFTS}/${mint}`)).data;

        NftScheme.parse(data);

        return new Nft(data);
    }
}

export default new NftService();
