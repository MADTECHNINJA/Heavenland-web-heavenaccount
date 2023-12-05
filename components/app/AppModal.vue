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
                <div class="fixed inset-0 bg-indigo-950 bg-opacity-80 transition-opacity" />
            </TransitionChild>

            <div class="fixed z-10 inset-0 overflow-y-auto">
                <div
                    class="flex items-center mt-12 sm:mt-0 md:mt-0 md:flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0"
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
                            class="relative border border-gray-400 border-opacity-[7%] bg-indigo-930 rounded-xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl sm:w-full sm:px-6 sm:pt-5 sm:pb-6"
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
                            <div class="flex justify-between items-center">
                                <AppSectionTitle size="lg">{{ title }}</AppSectionTitle>
                                <FontAwesomeIcon
                                    icon="times"
                                    class="h-5 w-5 text-gray-400 cursor-pointer"
                                    @click="closeModal"
                                />
                            </div>

                            <slot />
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script lang="ts" setup>
    import { TransitionChild, TransitionRoot, DialogPanel, Dialog } from '@headlessui/vue';

    defineProps<{
        modelValue: boolean;
        title: string;
    }>();

    const emits = defineEmits<{
        (e: 'update:modelValue', p: boolean): void;
    }>();

    const closeModal = () => {
        emits('update:modelValue', false);
    };
</script>

<style scoped></style>
