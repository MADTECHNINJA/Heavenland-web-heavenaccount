import attribute0 from '@/assets/paragons/attributes/score.png';
import attribute6 from '@/assets/paragons/attributes/sprint_speed.png';
import attribute8 from '@/assets/paragons/attributes/max_translocation_distance.png';
import attribute9 from '@/assets/paragons/attributes/translocation_recovery.png';
import attribute7 from '@/assets/paragons/attributes/jump_height.png';
import attribute2 from '@/assets/paragons/attributes/stamina_recovery_rate.png';
import attribute3 from '@/assets/paragons/attributes/stamina_usage_during_sprint.png';
import attribute4 from '@/assets/paragons/attributes/stamina_usage_per_translocation.png';
import attribute1 from '@/assets/paragons/attributes/stamina.png';
import attribute5 from '@/assets/paragons/attributes/walk_speed.png';
import { Attribute, CoreAttribute } from '~/types/Paragon.types';

export const getAttributeImage = (item: string) => {
    switch (item) {
        case Attribute.SCORE:
            return attribute0;

        case CoreAttribute.STAMINA:
            return attribute1;

        case CoreAttribute.STAMINA_RECOVERY_RATE:
            return attribute2;

        case CoreAttribute.STAMINA_USAGE_DURING_SPRINT:
            return attribute3;

        case CoreAttribute.STAMINA_USAGE_PER_TRANSLOCATION:
            return attribute4;

        case CoreAttribute.WALK_SPEED:
            return attribute5;

        case CoreAttribute.SPRINT_SPEED:
            return attribute6;

        case CoreAttribute.JUMP_HEIGHT:
            return attribute7;

        case CoreAttribute.MAX_TRANSLOCATION_DISTANCE:
            return attribute8;

        case CoreAttribute.TRANSLOCATION_RECOVERY:
            return attribute9;
    }
};
export const getTierMaxScore = (tier?: number) => {
    if (!tier) {
        return null;
    }

    if (tier == 5) {
        return 700;
    }

    return 99 + 100 * tier;
};
