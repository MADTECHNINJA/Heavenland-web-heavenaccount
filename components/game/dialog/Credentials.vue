<template>
    <div>
        <FormKit autocomplete="off" @submit="false" :actions="false" id="wtf" type="form">
            <!--  <FormKit type="group"> -->
            <template #default="{ state: { valid } }">
                <div class="min-h-[286px] md:max-h-[286px] my-auto">
                    <div class="flex gap-6 pt-12">
                        <div class="mx-auto my-auto w-full max-w-md lg:max-w-sm md:mx-0">
                            <AppLabel title="Username" class="mb-2" />

                            <FormKit
                                id="form_create_account_username"
                                name="Username"
                                value=""
                                v-model="innerUsername"
                                validation="required|length:2,20"
                                validation-visibility="dirty"
                            />

                            <div class="flex space-x-0.5 text-xs text-start tracking-tight text-indigo-300 mt-2 ml-0.5">
                                <FontAwesomeIcon :icon="['far', 'circle-info']" class="mr-1 mt-[0.075rem]" />
                                <p>Not visible to other users and used as your log-in name</p>
                            </div>
                        </div>
                        <div class="mx-auto hidden md:block w-full max-w-md lg:max-w-sm md:mx-0"></div>
                    </div>

                    <div class="flex flex-col md:flex-row gap-6 pt-6">
                        <div class="mx-auto w-full max-w-md lg:max-w-sm md:mx-0">
                            <AppLabel title="Password" class="mb-2" />

                            <FormKit
                                id="form_create_account_password"
                                name="Password"
                                v-model="password"
                                type="password"
                                validation="required|containsNumber|containsUppercase|length:8"
                                validation-visibility="dirty"
                                :validation-messages="{
                                    containsNumber: 'This value must contain at least one digit',
                                    containsUppercase: 'This value must contain at least one uppercase character',
                                }"
                            />

                            <div class="flex space-x-0.5 text-xs text-start tracking-tight text-indigo-300 mt-2 ml-0.5">
                                <FontAwesomeIcon :icon="['far', 'circle-info']" class="mr-1 mt-[0.075rem]" />
                                <p>Use strong password to protect your account</p>
                            </div>
                        </div>

                        <div class="mx-auto w-full max-w-md lg:max-w-sm md:mx-0">
                            <AppLabel title="Password confirmation" class="mb-2" />
                            <FormKit
                                id="form_create_account_confirm_password"
                                type="password"
                                v-model="passwordConfirm"
                                name="Password_confirm"
                                validation="required|confirm"
                                :validation-messages="{
                                    required: 'Password confirmation is required.',
                                    confirm: 'Passwords don\'t match.',
                                }"
                                validation-visibility="dirty"
                            />

                            <div class="flex space-x-0.5 text-xs text-start tracking-tight text-indigo-300 mt-2 ml-0.5">
                                <FontAwesomeIcon :icon="['far', 'circle-info']" class="mr-1 mt-[0.075rem]" />
                                <p>Passwords must match</p>
                            </div>
                        </div>
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
                        <AppButton :loading="loading" class="w-full" @click="checkUsername" :disabled="!valid">
                            Continue
                        </AppButton>
                    </div>
                </div>
            </template>
        </FormKit>
    </div>
</template>

<script lang="ts" setup>
    import { computed, ref } from '#imports';
    import { API } from '~/api';
    import { useAccountStore } from '~/store/account';

    const props = defineProps<{
        username: string;
        password: string;
        passwordConfirm: string;
        inlineBanner: boolean;
        inlineButtons: boolean;
    }>();

    const emits = defineEmits<{
        (e: 'update:username', p: string): void;
        (e: 'update:password', p: string): void;
        (e: 'update:passwordConfirm', p: string): void;
        (e: 'next'): void;
    }>();

    const error = ref('');
    const loading = ref(false);

    const accountStore = useAccountStore();

    const password = computed({
        get: () => {
            return props.password;
        },

        set: (value) => {
            emits('update:password', value);
        },
    });

    const passwordConfirm = computed({
        get: () => {
            return props.passwordConfirm;
        },

        set: (value) => {
            emits('update:passwordConfirm', value);
        },
    });

    const checkUsername = async () => {
        if (accountStore.account.data?.username !== props.username) {
            emits('next');
            return;
        }

        loading.value = true;
        error.value = '';

        const resp = await API.AccountService.exists(props.username, 'username');

        if (resp === true) {
            error.value = 'This username has already been taken';
        } else if (resp?.status === 404) {
            emits('next');
        } else {
            error.value = 'An unexpected error occurred, please try it later';
        }

        loading.value = false;
    };

    const innerUsername = computed({
        get: () => {
            return props.username;
        },

        set: (value) => {
            emits('update:username', value);
        },
    });
</script>

<style scoped></style>
