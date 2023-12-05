import { Paragon } from '~~/types/Paragon.types';

const defaultParagonData = {
    id: '1',
    tokenAddress: '',
    name: 'Paragon #1',
    symbol: 'PARAGON',
    collection: 'heavenland_paragons',
    assets: [
        {
            uri: '',
            labels: ['image', 'full_sized_image'],
        },
        {
            uri: '',
            labels: ['image', 'gameplay_image'],
        },
    ],
    metadata: {
        onChain: {
            symbol: 'PARAGON',
            name: 'Paragon #1',
            uri: '',
        },
        offChain: {
            name: 'Paragon #1',
            symbol: 'PARAGON',
            description:
                "Paragon NFTs are breedable, fusible, and stampable, with the primary purpose of enhancing the avatar's qualities, like its stamina, speed and translocation. They are destined to help their holders rule the metaverse.",
            image: '',
            attributes: [
                {
                    value: '0',
                    trait_type: 'Score',
                },
                {
                    value: '0',
                    trait_type: 'Tier',
                },
                {
                    value: '0',
                    trait_type: 'Breed Count',
                },
                {
                    value: '',
                    trait_type: 'PFP Mint',
                },
                {
                    value: '0',
                    trait_type: 'Stamina',
                },
                {
                    value: '0',
                    trait_type: 'Stamina Recovery Rate',
                },
                {
                    value: '0',
                    trait_type: 'Stamina Usage during Sprint',
                },
                {
                    value: '0',
                    trait_type: 'Stamina Usage per Translocation',
                },
                {
                    value: '0',
                    trait_type: 'Walk Speed',
                },
                {
                    value: '0',
                    trait_type: 'Sprint Speed',
                },
                {
                    value: '0',
                    trait_type: 'Jump Height',
                },
                {
                    value: '0',
                    trait_type: 'Max Translocation Distance',
                },
                {
                    value: '0',
                    trait_type: 'Translocation Recovery',
                },
                {
                    value: '0',
                    trait_type: 'Internal ID',
                },
            ],
            properties: {
                category: 'image',
                files: [
                    {
                        uri: '',
                        type: 'image/png',
                    },
                ],
            },
            seller_fee_basis_points: 500,
            external_url: 'https://heavenland.io/',
        },
    },
};

export const DefaultParagon = new Paragon(defaultParagonData);
