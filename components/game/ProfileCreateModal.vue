<template>
    <AppModal v-model="opened" title="Game profile">
        <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <AppDialogSteps :steps="steps" :order="true">
                    <component
                        :is="steps.currentStep"
                        :paragons="stampedParagons ?? []"
                        :paragonsFetched="paragons.fetched"
                        v-model:paragon="selectedParagon"
                        v-model:username="username"
                        v-model:nickname="nickname"
                        v-model:password="password"
                        v-model:passwordConfirm="passwordConfirm"
                        @next="steps.nextStep()"
                        @back="steps.previousStep()"
                        @create="onGameProfileCreate"
                        setup
                        inline-buttons
                        inline-banner
                    />
                </AppDialogSteps>
            </div>
        </div>
    </AppModal>
</template>

<script setup lang="ts">
    import { ref, computed, isFormValidationError } from '#imports';
    import { Account, CreateGameAccountRequestParams } from '~/types/Account.types';
    import StepParagonGameCredentials from '~/components/game/dialog/Credentials.vue';
    import StepParagonGameProfile from '~/components/game/dialog/Paragon.vue';
    import StepParagonGameInformation from '~/components/game/dialog/Information.vue';
    import StepParagonGameConfirmation from '~/components/game/dialog/Confirmation.vue';
    import { Paragon } from '~/types/Paragon.types';
    import { useAccountStore } from '~/store/account';
    import { ComputedRef, onMounted, watch } from 'vue';
    import { Steps } from '~/types/Steps.types';
    import { NotificationManager } from '~/types/NotificationManager.types';
    import { NotificationTitles } from '~/types/Notification.data';
    import { Variant } from '~/types/Notification.types';
    import { setErrors } from '@formkit/core';

    const props = defineProps<{
        modelValue: boolean;
        setup?: boolean;
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

    const updateGameProfileButtonLoading = ref(false);

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

    const selectedParagon = ref<Paragon | null>(null);

    const steps = new Steps([
        {
            title: 'Game Credentials',
            id: 0,
            component: StepParagonGameCredentials,
        },
        {
            title: 'Paragon',
            id: 1,
            component: StepParagonGameProfile,
        },
        {
            title: 'Information',
            id: 2,
            component: StepParagonGameInformation,
        },
        {
            title: 'Confirmation',
            id: 3,
            component: StepParagonGameConfirmation,
        },
    ]);

    const username = ref<string>('');
    const nickname = ref<string>('');
    const password = ref<string>('');
    const passwordConfirm = ref<string>('');

    onMounted(() => {
        username.value = accountData.value?.username ?? '';
        nickname.value = accountData.value?.nickname ?? '';
    });

    const accountStore = useAccountStore();

    const accountData: ComputedRef<Account | null> = computed(() => {
        return accountStore.account.data;
    });

    const onGameProfileCreate = async (onFinished: () => void) => {
        const notification = NotificationManager.getInstance().create({
            title: NotificationTitles.GAME_PROFILE,
            message: 'Updating your game profile...',
            variant: Variant.LOADING,
        });

        if (!notification) {
            onFinished();
            return;
        }

        try {
            const createGameAccountParams: CreateGameAccountRequestParams = {
                username: username.value,
                password: password.value,
                nickname: nickname.value,
                passwordCheck: password.value,
                mainParagonAddress: selectedParagon.value?.mint ? selectedParagon.value?.mint : undefined,
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
