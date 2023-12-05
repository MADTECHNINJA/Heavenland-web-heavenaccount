<template>
    <TransitionRoot as="template" :show="modelValue">
        <Dialog as="div" class="relative z-10" @close="closeModal">
            <TransitionChild
                as="template"
                enter="ease-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in duration-200"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-indigo-950 bg-opacity-90 transition-opacity" />
            </TransitionChild>

            <div class="fixed z-10 inset-0 overflow-y-auto">
                <div
                    class="mt-12 md:mt-0 md:flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0"
                >
                    <TransitionChild
                        as="template"
                        enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <DialogPanel
                            class="relative bg-indigo-930 rounded-xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:px-6 sm:pt-5 sm:pb-6"
                        >
                            <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    class="bg-white rounded-md text-gray-400 hover:text-gray-500"
                                    @click="closeModal"
                                >
                                    <span class="sr-only">Close</span>
                                </button>
                            </div>
                            <div class="sm:flex sm:items-start">
                                <div class="text-center sm:text-left w-full">
                                    <div class="flex justify-between items-center">
                                        <AppSectionTitle size="lg">Password change</AppSectionTitle>
                                        <FontAwesomeIcon
                                            icon="times"
                                            class="h-5 w-5 text-gray-400 cursor-pointer"
                                            @click="closeModal"
                                        />
                                    </div>

                                    <div class="border-b mt-3 border-gray-400 border-opacity-10" />

                                    <FormKit type="group">
                                        <template #default="{ state: { valid } }">
                                            <AppLabel class="mt-6" title="Password" />
                                            <FormKit
                                                v-model="password"
                                                type="password"
                                                name="Password"
                                                validation="required|containsNumber|containsUppercase|length:8"
                                                validation-visibility="dirty"
                                                :validation-messages="{
                                                    containsNumber: 'This value must contain at least one digit',
                                                    containsUppercase:
                                                        'This value must contain at least one uppercase character',
                                                }"
                                            />

                                            <AppLabel class="mt-6" title="Confirm password" />
                                            <FormKit
                                                v-model="confirmPassword"
                                                type="password"
                                                name="Password confirmation"
                                                validation="required|confirm:Password"
                                                validation-visibility="dirty"
                                            />

                                            <div class="mt-9 sm:flex sm:flex-row-reverse w-full">
                                                <AppButton
                                                    class="w-full"
                                                    @click="setPassword"
                                                    :loading="setPasswordLoadingButton"
                                                    :disabled="!valid"
                                                >
                                                    Change
                                                </AppButton>
                                            </div>
                                        </template>
                                    </FormKit>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
    import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';
    import { ref } from '#imports';
    import { NotificationManager } from '~/types/NotificationManager.types';
    import { NotificationTitles } from '~/types/Notification.data';
    import { Variant } from '~/types/Notification.types';
    import { SetPasswordAccountRequestParams } from '~/types/Account.types';
    import { useAccountStore } from '~/store/account';
    import { watch } from 'vue';

    const props = defineProps<{
        modelValue: boolean;
    }>();

    const emits = defineEmits<{
        (e: 'update:modelValue', p: boolean): void;
    }>();

    const closeModal = () => {
        emits('update:modelValue', false);
    };

    const setPasswordLoadingButton = ref(false);
    const password = ref('');
    const confirmPassword = ref('');

    const accountStore = useAccountStore();

    watch(
        () => props.modelValue,
        () => {
            password.value = '';
            confirmPassword.value = '';
        }
    );

    const setPassword = async () => {
        setPasswordLoadingButton.value = true;

        const notification = NotificationManager.getInstance().create({
            title: NotificationTitles.PASSWORD_CHANGE,
            message: 'Changing user password...',
            variant: Variant.LOADING,
        });

        if (!notification) {
            return;
        }

        try {
            const passwordChangeParams: SetPasswordAccountRequestParams = {
                password: password.value,
                passwordCheck: confirmPassword.value,
            };

            await accountStore.updateAccount(passwordChangeParams);

            notification.setSuccess('Password successfully changed');

            closeModal();
        } catch {
            notification.setError('Password change failed');
        } finally {
            setPasswordLoadingButton.value = false;
        }
    };
</script>

<style scoped></style>
