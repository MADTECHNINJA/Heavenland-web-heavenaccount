import { z } from 'zod';

const NftAttributeScheme = z.object({
    value: z.string(),
    trait_type: z.string(),
});
export const NftScheme = z.object({
    id: z.string(),
    tokenAddress: z.string(),
    name: z.string(),
    symbol: z.string(),
    collection: z.string(),
    assets: z.array(
        z.object({
            uri: z.string(),
            labels: z.array(z.string()),
        })
    ),
    metadata: z.object({
        onChain: z.object({
            symbol: z.string(),
            name: z.string(),
            uri: z.string(),
        }),
        offChain: z.object({
            name: z.string(),
            symbol: z.string(),
            description: z.string(),
            image: z.string(),
            seller_fee_basis_points: z.number(),
            external_url: z.string(),
            properties: z.object({
                category: z.string(),
                files: z.array(
                    z.object({
                        uri: z.string(),
                        type: z.string(),
                    })
                ),
            }),
            attributes: z.array(NftAttributeScheme),
        }),
    }),
});

export type NftData = z.infer<typeof NftScheme>;

export class Nft {
    constructor(readonly data: NftData) {
        this.data = data;
    }

    get image() {
        return this.data.metadata.offChain.image;
    }

    get mint() {
        return this.data.tokenAddress;
    }

    get isStamped() {
        return this.data.metadata.offChain.attributes.find((a) => a.trait_type === 'PFP Mint')?.value !== '';
    }
}
