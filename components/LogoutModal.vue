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
                                    <div v-if="isLogoutError" class="flex items-center flex-col">
                                        <FontAwesomeIcon
                                            icon="times"
                                            class="absolute top-4 right-4 h-5 w-5 text-gray-400 cursor-pointer"
                                            @click="closeModal"
                                        />
                                        <FontAwesomeIcon
                                            class="h-8 w-8 mt-2.5 text-red-500"
                                            :icon="['fas', 'triangle-exclamation']"
                                        />
                                        <p class="mt-3 text-lg font-semibold">Error</p>
                                        <p class="mt-4 text-gray-400 text-sm">An error occurred while logging out.</p>
                                        <p class="mt-1 text-gray-400 text-sm">Please try again later.</p>
                                    </div>

                                    <div v-else class="flex items-center flex-col">
                                        <AppSpinner :size="7" />
                                        <p class="mt-3 text-lg font-semibold">Please wait</p>
                                        <p class="mt-4 text-gray-400 text-sm">Logout in progress...</p>
                                    </div>
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
    import { watch } from 'vue';
    import { useAuthStore } from '~/store/auth';
    import { redirectToAuth } from '~/js/url';
    import { ref } from '#imports';

    const props = defineProps<{
        modelValue: boolean;
    }>();

    const emits = defineEmits<{
        (e: 'update:modelValue', p: boolean): void;
    }>();

    const closeModal = () => {
        emits('update:modelValue', false);
    };

    const authStore = useAuthStore();
    const isLogoutError = ref(false);

    watch(
        () => props.modelValue,
        async () => {
            if (props.modelValue) {
                isLogoutError.value = false;

                try {
                    await authStore.logout();
                    redirectToAuth();
                } catch {
                    isLogoutError.value = true;
                }
            }
        }
    );
</script>

<style scoped></style>
