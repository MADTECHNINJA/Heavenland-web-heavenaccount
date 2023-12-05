<template>
    <div>
        <div
            :class="paragons?.length > 0 && 'overflow-y-scroll'"
            class="md:min-h-[350px] md:max-h-[350px] flex md:block items-center pt-6 custom-scrollbar"
        >
            <img
                class="absolute left-1/2 -translate-x-1/2 bottom-[4.75rem] md:bottom-[5.4rem] h-32 md:h-52 w-auto opacity-[15%]"
                :src="paragonImage"
            />

            <AppSpinner v-if="!paragonsFetched" />

            <div
                v-else-if="!paragons?.length"
                class="md:min-h-[310px] flex-col justify-start items-center md:pt-8 flex relative"
            >
                <AppSectionTitle>No paragons</AppSectionTitle>

                <p class="text-gray-400 text-sm tracking-tight mt-3">
                    You don't have any stamped paragons in your connected wallet.
                </p>

                <p class="text-gray-400 text-sm tracking-tight mt-6 leading-6">
                    Your game paragon is set to a default one.<br />You can always set up your game paragon later.
                </p>

                <AppBanner class="mt-12 text-center">
                    <div>
                        <p>It may take some time to perform transactions and load the paragon from the wallet.</p>

                        <p class="mt-1">In case you don't see your paragon, try it again later.</p>
                    </div>
                </AppBanner>
            </div>

            <div v-else>
                <p class="text-gray-400 text-sm tracking-tight">
                    Select one of your paragons to be the main paragon for your game profile.
                </p>

                <div class="grid grid-cols-2 md:grid-cols-6 gap-3 pt-6 md:min-h-[310px] md:max-h-[310px]">
                    <template v-for="p in paragons" :key="p.data.id">
                        <ParagonNft :selected="isSelected(p)" :item="p" @select="onParagonSelected" />
                    </template>
                </div>
            </div>
        </div>

        <hr v-if="inlineButtons" class="border-gray-400 border-opacity-[10%] mt-3" />

        <div v-if="inlineButtons" class="mt-6 flex justify-center md:space-x-12 space-x-6">
            <div v-if="setup" class="min-w-[150px] max-w-[150px]">
                <AppSecondaryButton class="w-full" @click="emits('back')" icon="chevron-left" prepend-icon>
                    Back
                </AppSecondaryButton>
            </div>
            <div class="min-w-[150px] max-w-[150px]">
                <AppButton class="w-full" @click="emits('next')" :disabled="isButtonDisabled"> Continue </AppButton>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { computed } from '#imports';
    import { Paragon } from '~/types/Paragon.types';
    import paragonImage from '@/assets/paragons/no_paragons.png';

    const props = defineProps<{
        setup?: boolean;
        nickname?: string;
        paragons: Paragon[];
        paragonsFetched: boolean;
        paragon: Paragon | null;
        inlineButtons: boolean;
    }>();

    const isButtonDisabled = computed(() => {
        return props.paragons?.length && props.paragon === null;
    });

    const isSelected = (p: Paragon) => {
        return props.paragon?.mint === p.mint;
    };

    const emits = defineEmits<{
        (e: 'update:paragon', paragon: Paragon): void;
        (e: 'next'): void;
        (e: 'back'): void;
        (e: 'update', callback: () => void): void;
    }>();

    const onParagonSelected = (paragon: Paragon) => {
        emits('update:paragon', paragon);
    };
</script>

<style scoped></style>
