export const enum Path {
    AUTH = 'auth',
    ACCOUNTS = 'accounts',
    INVENTORY = 'inventory',
    INVENTORY_ACCOUNTS = 'inventory/accounts',
    NFTS = 'nfts',
}

export const SubPath = {
    AUTH: {
        NONCES: 'nonces',
        ACCESS_TOKEN: 'tokens/access-token',
        GAME_AUTH_TOKEN: 'tokens/game-auth-token',
        LOGIN: 'login',
    },
    INVENTORY: {
        AVATARS: 'character/list',
        BUILDINGS: 'builder',
        PARAGONS: 'nfts/paragons',
    },
    NFTS: {
        IMAGES: 'images',
    },
};
