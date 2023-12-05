<template>
    <div class="grid grid-cols-3 gap-y-5 gap-x-7">
        <div
            v-for="attribute in CoreAttribute"
            class="col-span-1 min-w-[75px] md:min-w-[100px] space-x-2 flex items-center"
            :key="attribute"
        >
            <AppTooltip :text="attribute">
                <img :src="getAttributeImage(attribute)" class="h-5 w-5" alt="Attribute" />
            </AppTooltip>
            <div class="bg-white bg-opacity-10 grow h-1 w-[50px] md:w-[75px] rounded-full overflow-clip">
                <div
                    class="bg-gradient-to-r h-1 rounded-full transition-all"
                    :class="[accentBgColor]"
                    :style="{ width: paragon.getAttribute(attribute) + '%' }"
                />
            </div>
            <p class="text-xs font-semibold min-w-[20px]">{{ paragon.getAttribute(attribute) }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { CoreAttribute, Paragon } from '~/types/Paragon.types';
    import { getAttributeImage } from '~/types/Paragon.utils';
    import { computed } from 'vue';

    const props = defineProps<{
        paragon: Paragon;
    }>();

    const accentBgColor = computed(() => {
        switch (props.paragon.tier) {
            case 0:
                return 'from-[#b3e109] to-[#658005]';

            case 1:
                return 'from-[#f123f0] to-[#801380]';

            case 2:
                return 'from-[#67cab1] to-[#418070]';

            default:
                return 'from-[#1b5857]';
        }
    });
</script>

<style scoped></style>
