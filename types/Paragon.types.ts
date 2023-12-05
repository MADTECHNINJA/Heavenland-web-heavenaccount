import { Nft, NftData } from '~/types/Nft.types';

export class Paragon extends Nft {
    constructor(data: NftData) {
        super(data);
    }

    get tier() {
        return parseInt(this.data.metadata.offChain.attributes?.find((a) => a.trait_type === 'Tier')?.value as string);
    }

    get gameImage() {
        return this.data.assets.find((a) => a.labels.includes('gameplay_image'))?.uri;
    }

    getAttribute(attr: Attribute | CoreAttribute) {
        return this.data.metadata.offChain.attributes.find((a) => a.trait_type === attr)?.value;
    }
}

export enum Attribute {
    SCORE = 'Score',
}

export enum CoreAttribute {
    STAMINA = 'Stamina',
    STAMINA_RECOVERY_RATE = 'Stamina Recovery Rate',
    STAMINA_USAGE_DURING_SPRINT = 'Stamina Usage during Sprint',
    STAMINA_USAGE_PER_TRANSLOCATION = 'Stamina Usage per Translocation',
    WALK_SPEED = 'Walk Speed',
    SPRINT_SPEED = 'Sprint Speed',
    JUMP_HEIGHT = 'Jump Height',
    MAX_TRANSLOCATION_DISTANCE = 'Max Translocation Distance',
    TRANSLOCATION_RECOVERY = 'Translocation Recovery',
}
