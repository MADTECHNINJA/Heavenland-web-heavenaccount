<template>
    <div>
        <div class="min-h-[350px] md:max-h-[350px] flex items-center gap-6 pt-6">
            <div class="w-full flex h-full flex-col items-center justify-center">
                <AppSectionTitle>Game profile ready!</AppSectionTitle>

                <p class="text-gray-400 text-sm tracking-tight mt-3">
                    Your game profile has been prepared. Please check the information below and confirm the creation of
                    your game profile.
                </p>

                <div class="w-full mt-6 md:mb-0 mx-6">
                    <GameProfileCard
                        :username="username"
                        :nickname="nickname"
                        :paragon-data="paragon"
                        :paragon-fetched="true"
                        :paragon-error="false"
                    />
                </div>
            </div>
        </div>

        <hr v-if="inlineButtons" class="border-gray-400 border-opacity-[10%] mt-3" />

        <div v-if="inlineButtons" class="mt-6 flex justify-center md:space-x-12">
            <div class="min-w-[150px] max-w-[150px]">
                <AppSecondaryButton class="w-full" @click="emits('back')" icon="chevron-left" prepend-icon>
                    Back
                </AppSecondaryButton>
            </div>

            <div class="min-w-[150px] max-w-[150px]">
                <AppButton class="w-full" @click="onCreate" :loading="createButtonLoading"> Confirm </AppButton>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from '#imports';
    import { Paragon } from '~/types/Paragon.types';

    defineProps<{
        username: string;
        nickname: string;
        paragon: Paragon | null;
        inlineButtons: boolean;
        inlineBanner: boolean;
    }>();

    const createButtonLoading = ref(false);

    const emits = defineEmits<{
        (e: 'update:username', p: string): void;
        (e: 'update:nickname', p: string): void;
        (e: 'back'): void;
        (e: 'create', onFinished: () => void): void;
    }>();

    const onCreate = () => {
        createButtonLoading.value = true;

        emits('create', () => {
            createButtonLoading.value = false;
        });
    };
</script>

<style scoped></style>
