<template>
    <AppModal v-model="opened" title="Game profile">
        <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <GameProfileCard
                    v-if="!setup"
                    :username="username"
                    :nickname="nickname"
                    :paragon-data="selectedParagon ?? gameProfileParagon.data()"
                    :paragon-fetched="true"
                    :paragon-error="false"
                    class="mt-4 mb-3"
                />

                <AppDialogSteps :steps="steps" :order="setup">
                    <div class="relative">
                        <component
                            :is="steps.currentStep"
                            :paragons="stampedParagons"
                            :paragonsFetched="paragons.fetched"
                            :setup="setup"
                            v-model:paragon="selectedParagon"
                            v-model:username="username"
                            v-model:nickname="nickname"
                            @next="proceedNextStep"
                            @prev="proceedPrevStep"
                            :closed="opened"
                        />

                        <div v-if="error" class="flex mt-3 w-full justify-center">
                            <AppBanner class="mt-0 w-full" icon="exclamation-triangle" type="error">
                                <p>{{ error }}</p>
                            </AppBanner>
                        </div>
                    </div>
                </AppDialogSteps>

                <hr class="border-gray-400 border-opacity-[10%]" />

                <div class="mt-6 flex justify-center md:space-x-12 space-x-6">
                    <div class="min-w-[150px] max-w-[150px]">
                        <AppButton
                            :disabled="isUpdateButtonDisabled"
                            class="w-full"
                            @click="updateGameProfile"
                            :loading="updateGameProfileButtonLoading"
                        >
                            Update
                        </AppButton>
                    </div>
                </div>
            </div>
        </div>
    </AppModal>
</template>

<script setup lang="ts">
    import { mapState } from 'pinia';
    import { ref, isFormValidationError, computed } from '#imports';
    import { NotificationManager } from '~/types/NotificationManager.types';
    import { NotificationTitles } from '~/types/Notification.data';
    import { Variant } from '~/types/Notification.types';
    import { Account, UpdateDataAccountRequestParams } from '~/types/Account.types';
    import { setErrors } from '@formkit/core';
    import StepParagonGameProfile from '~/components/game/dialog/Paragon.vue';
    import StepParagonGameInformation from '~/components/game/dialog/Information.vue';
    import { Paragon } from '~/types/Paragon.types';
    import { useAccountStore } from '~/store/account';
    import { ComputedRef, onMounted, watch } from 'vue';
    import { Steps } from '~/types/Steps.types';
    import { API } from '~/api';

    const setup = ref(false);

    const props = defineProps<{
        modelValue: boolean;
    }>();

    watch(
        () => props.modelValue,
        () => {
            if (props.modelValue && gameProfileParagonMint.value) {
                const paragon = stampedParagons.value?.find((p) => p.mint === gameProfileParagonMint.value);

                if (paragon) {
                    selectedParagon.value = paragon;
                }
            }
        }
    );

    const gameProfileParagon = mapState(useAccountStore, {
        fetched: (store) => store.gameProfileParagon.fetched,
        error: (store) => store.gameProfileParagon.error,
        data: (store) => store.gameProfileParagon.data,
    });

    const proceedPrevStep = () => {
        steps.previousStep();
    };

    const proceedNextStep = () => {
        steps.nextStep();
    };

    const gameProfileParagonMint = computed(() => {
        return accountData.value?.mainParagonAddress;
    });

    const paragons = computed(() => accountStore.paragons);

    const stampedParagons: ComputedRef<Paragon[] | undefined> = computed(() => {
        return paragons.value?.data?.items.filter((p) => p.isStamped);
    });

    const emits = defineEmits<{
        (e: 'update:modelValue', p: boolean): void;
        (e: 'refetch'): void;
    }>();

    const opened = computed({
        get: () => props.modelValue,
        set: (value) => emits('update:modelValue', value),
    });

    watch(opened, () => {
        if (!opened.value) {
            nickname.value = accountData.value?.nickname ?? '';
            username.value = accountData.value?.username ?? '';
            userExists.value = false;
        }
    });

    const selectedParagon = ref<Paragon | null>(null);

    const steps = new Steps([
        {
            title: 'Paragon',
            id: 0,
            component: StepParagonGameProfile,
        },
        {
            title: 'Information',
            id: 1,
            component: StepParagonGameInformation,
        },
    ]);

    const updateGameProfileButtonLoading = ref(false);

    const nickname = ref<string>('');
    const userExists = ref(false);
    const username = ref<string>('');
    const error = ref('');

    onMounted(() => {
        selectedParagon.value = null;
        nickname.value = accountData.value?.nickname ?? '';
        username.value = accountData.value?.username ?? '';
    });

    const accountStore = useAccountStore();

    const accountData: ComputedRef<Account | null> = computed(() => {
        return accountStore.account.data;
    });

    const isUpdateButtonDisabled = computed(() => {
        return (
            ((selectedParagon.value?.mint === accountData.value?.mainParagonAddress || !selectedParagon.value) &&
                nickname.value === accountData.value?.nickname) ||
            nickname.value.length < 2 ||
            nickname.value.length > 20 ||
            (accountData.value?.nickname === nickname.value &&
                accountData.value?.mainParagonAddress === selectedParagon.value?.mint)
        );
    });

    const updateGameProfile = async () => {
        error.value = '';
        updateGameProfileButtonLoading.value = true;

        if (accountData.value?.nickname !== nickname.value) {
            const resp = await API.AccountService.exists(nickname.value, 'nickname');

            if (resp === true) {
                error.value = 'Nickname has already been taken';
                updateGameProfileButtonLoading.value = false;
                return;
            } else if (resp?.status !== 404) {
                error.value = 'An unexpected error occurred, please try it later';
                updateGameProfileButtonLoading.value = false;
                return;
            }
        }

        const notification = NotificationManager.getInstance().create({
            title: NotificationTitles.GAME_PROFILE,
            message: 'Updating your game profile...',
            variant: Variant.LOADING,
        });

        if (!notification) {
            updateGameProfileButtonLoading.value = false;
            return;
        }

        try {
            const createGameAccountParams: UpdateDataAccountRequestParams = {
                nickname: accountData.value?.nickname !== nickname.value ? nickname.value : undefined,
                mainParagonAddress:
                    accountData.value?.mainParagonAddress !== selectedParagon.value?.mint
                        ? selectedParagon.value?.mint
                        : undefined,
            };

            await accountStore.updateAccount(createGameAccountParams);

            notification.setSuccess('Game profile successfully updated');

            emits('refetch');
            emits('update:modelValue', false);
        } catch (e: any) {
            if (isFormValidationError(e)) {
                if (e.data?.errorMessage.includes('Username')) {
                    setErrors('form_create_account_username', e.data?.errorMessage);
                }

                if (e.data?.errorMessage.includes('Nickname')) {
                    setErrors('form_create_account_nickname', e.data?.errorMessage);
                }
            }

            notification.setError('Game account creation failed');
        } finally {
            updateGameProfileButtonLoading.value = false;
        }
    };
</script>

<style scoped></style>
