<template>
    <div class="relative">
        <div
            class="absolute top-0 left-0 bottom-0 right-0 rounded-lg bg-gradient-to-r opacity-[5%]"
            :class="[accentBgColor]"
        />
        <div
            class="flex relative z-10 flex-col lg:flex-row min-h-[140px] justify-center md:justify-between border pl-2 pr-2 lg:pr-6 border-white border-opacity-[10%] rounded-lg gap-3 md:items-center spaces-y-6"
        >
            <div class="flex items-center gap-x-3 md:gap-x-6">
                <div class="flex flex-col items-center">
                    <div class="h-[125px] w-[125px] flex justify-center items-center">
                        <AppSpinner v-if="!paragonFetched || paragonError" :size="5" />
                        <ParagonNft v-else-if="paragonData" :item="paragonData" game-profile />
                        <img v-else alt="Paragon" :src="tier0" class="h-[100px]" />
                    </div>

                    <div v-if="paragonData" class="flex items-center space-x-2 -mt-2 px-3">
                        <AppTooltip :text="Attribute.SCORE">
                            <img :src="getAttributeImage(Attribute.SCORE)" class="h-5 w-5" />
                        </AppTooltip>

                        <div class="bg-white bg-opacity-[5%] h-1 w-[40px] rounded-full overflow-clip">
                            <div
                                class="bg-gradient-to-r h-1 rounded-full transition-all"
                                :class="[accentBgColor]"
                                :style="{ width: (100 / 900) * paragonData?.getAttribute(Attribute.SCORE) + '%' }"
                            ></div>
                        </div>
                        <p class="text-xs font-semibold min-w-[25px]">
                            {{ paragonData?.getAttribute(Attribute.SCORE) ?? '--' }}
                        </p>
                    </div>
                </div>

                <div class="flex-col flex items-start">
                    <p v-if="username" class="tracking-tight text-gray-500 text-xs">Username</p>
                    <p
                        v-if="username && username.length < 12"
                        class="tracking-tight text-ellipsis overflow-hidden w-32 text-left font-medium"
                    >
                        {{ username }}
                    </p>
                    <AppTooltip v-else-if="username" :text="username">
                        <p class="tracking-tight text-ellipsis overflow-hidden w-32 text-left font-medium">
                            {{ username }}
                        </p>
                    </AppTooltip>

                    <p v-if="nickname" class="tracking-tight text-gray-500 mt-4 text-xs">Nickname</p>
                    <p
                        v-if="nickname && nickname.length < 12"
                        class="tracking-tight text-ellipsis overflow-hidden text-left w-32 font-medium"
                    >
                        {{ nickname }}
                    </p>
                    <AppTooltip v-else-if="nickname" :text="nickname">
                        <p class="tracking-tight text-ellipsis overflow-hidden text-left w-32 font-medium">
                            {{ nickname }}
                        </p>
                    </AppTooltip>
                </div>
            </div>

            <GameProfileAttributes v-if="paragonData" :paragon="paragonData" class="my-6 md:mt-0 lg:mt-6" />
            <GameProfileAttributes v-else :paragon="DefaultParagon" class="my-6 md:mt-0 lg:mt-6" />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { Attribute, Paragon } from '~/types/Paragon.types';
    import tier0 from '@/assets/paragons/defaultParagon.png';
    import { computed } from 'vue';
    import { getAttributeImage } from '~/types/Paragon.utils';
    import { DefaultParagon } from '~/utils/defaultParagon';
    Paragon;
    const props = defineProps<{
        paragonFetched: boolean;
        paragonError: boolean;
        paragonData: Paragon | null;
        username?: string | null;
        nickname?: string | null;
    }>();

    const accentBgColor = computed(() => {
        switch (props.paragonData?.tier) {
            case 0:
                return 'to-[#b3e109] from-[#658005]';

            case 1:
                return 'to-[#f123f0] from-[#801380]';

            case 2:
                return 'to-[#67cab1] from-[#418070]';

            default:
                return 'to-[#b3e109] from-[#658005]';
        }
    });
</script>

<style scoped></style>
