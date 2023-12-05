<template>
    <div>
        <FormKit class="z-[5]" type="group">
            <template #default="{ state: { valid } }">
                <div
                    class="flex flex-col items-center mx-auto justify-center max-w-md pt-12 min-h-[286px] md:max-h-[286px]"
                >
                    <AppSectionTitle>Nickname</AppSectionTitle>

                    <p class="text-gray-400 text-center text-sm tracking-tight leading-6 mt-3">
                        Please select your nickname. Your nickname must be unique and will be displayed in the game to
                        all other users.
                    </p>

                    <div class="mx-auto my-auto w-full z-[5] max-w-md lg:max-w-sm md:mx-0">
                        <AppLabel title="Nickname" class="mb-2" />

                        <FormKit
                            id="form_create_account_nickname"
                            name="Nickname"
                            v-model="innerNickname"
                            validation="required|length:2,20"
                            validation-visibility="dirty"
                        />
                    </div>
                </div>

                <div v-if="inlineBanner" class="min-h-[40px] mt-6">
                    <div v-if="error" class="flex">
                        <AppBanner icon="exclamation-triangle" type="error" class="w-full">
                            <p>{{ error }}</p>
                        </AppBanner>
                    </div>

                    <div v-else class="h-[40px] md:hidden" />
                </div>

                <hr v-if="inlineButtons" class="border-gray-400 border-opacity-[10%] mt-3" />

                <div v-if="inlineButtons" class="mt-6 flex justify-center md:space-x-12 space-x-6">
                    <div class="min-w-[150px] max-w-[150px]">
                        <AppSecondaryButton class="w-full" @click="emits('back')" icon="chevron-left" prepend-icon>
                            Back
                        </AppSecondaryButton>
                    </div>

                    <div class="min-w-[150px] max-w-[150px]">
                        <AppButton class="w-full" @click="checkNickname" :loading="loading" :disabled="!valid">
                            Continue
                        </AppButton>
                    </div>
                </div>
            </template>
        </FormKit>

        <img
            class="absolute left-1/2 -translate-x-1/2 bottom-[4.75rem] md:bottom-[5.4rem] h-32 md:h-64 w-auto z-[0] opacity-[15%]"
            :src="gameProfileNicknameImage"
        />
    </div>
</template>

<script lang="ts" setup>
    import { computed, ref } from '#imports';
    import gameProfileNicknameImage from '@/assets/gameProfileNickname.png';

    import { API } from '~/api';
    import { useAccountStore } from '~/store/account';

    const props = defineProps<{
        nickname: string;
        setup: boolean;
        inlineButtons: boolean;
        inlineBanner: boolean;
    }>();

    const loading = ref(false);

    const emits = defineEmits<{
        (e: 'update:nickname', p: string): void;
        (e: 'back'): void;
        (e: 'next'): void;
    }>();

    const error = ref('');

    const accountStore = useAccountStore();

    const checkNickname = async () => {
        if (accountStore.account.data?.nickname !== props.nickname) {
            emits('next');
            return;
        }

        loading.value = true;
        error.value = '';

        const resp = await API.AccountService.exists(props.nickname, 'nickname');

        if (resp === true) {
            error.value = 'Nickname has already been taken';
        } else if (resp?.status === 404) {
            emits('next');
        } else {
            error.value = 'An unexpected error occurred, please try it later';
        }
        loading.value = false;
    };

    const innerNickname = computed({
        get: () => {
            return props.nickname;
        },

        set: (value) => {
            emits('update:nickname', value);
        },
    });
</script>

<style scoped></style>
