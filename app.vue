<template>
    <NuxtLoadingIndicator
        :height="3"
        :duration="3000"
        color="repeating-linear-gradient(to right,#4C44DB 0%,#482CD4 100%)"
    />
    <div>
        <LogoutModal v-model="logoutModal" />

        <div ref="client">
            <div class="z-50 bottom-3 fixed -right-[350px] w-full md:w-auto md:min-w-[350px]">
                <transition-group name="list-complete">
                    <div class="list-complete-item" v-for="notification in NM.notifications" :key="notification.id">
                        <AppNotification :width="client?.clientWidth ?? 0" :notification="notification" />
                    </div>
                </transition-group>
            </div>

            <Authentication v-if="!isVerified" />

            <TransitionRoot v-if="isVerified" as="template" :show="sidebarOpen">
                <Dialog as="div" class="fixed inset-0 flex z-40 md:hidden" @close="sidebarOpen = false">
                    <TransitionChild
                        as="template"
                        enter="transition-opacity ease-linear duration-300"
                        enter-from="opacity-0"
                        enter-to="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leave-from="opacity-100"
                        leave-to="opacity-0"
                    >
                        <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </TransitionChild>
                    <TransitionChild
                        as="template"
                        enter="transition ease-in-out duration-300 transform"
                        enter-from="-translate-x-full"
                        enter-to="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leave-from="translate-x-0"
                        leave-to="-translate-x-full"
                    >
                        <div class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-indigo-950">
                            <TransitionChild
                                as="template"
                                enter="ease-in-out duration-300"
                                enter-from="opacity-0"
                                enter-to="opacity-100"
                                leave="ease-in-out duration-300"
                                leave-from="opacity-100"
                                leave-to="opacity-0"
                            >
                                <div class="absolute top-4 right-4 pt-[0.5rem]">
                                    <FontAwesomeIcon
                                        icon="times"
                                        class="ml-1 flex items-center justify-center h-[18px] w-[18px] rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-950"
                                        @click="sidebarOpen = false"
                                    />
                                </div>
                            </TransitionChild>
                            <div class="flex-shrink-0 flex items-center px-3">
                                <img class="h-[1.6rem] mx-auto" :src="heavenaccount" alt="Heavenaccount" />
                            </div>
                            <LayoutMenu
                                class="pt-3 mt-10 pb-5 mb-10"
                                @update:open="sidebarOpen = false"
                                @logout="logout"
                                :mobile="true"
                            />
                        </div>
                    </TransitionChild>
                    <div class="flex-shrink-0 w-14" aria-hidden="true">
                        <!-- Dummy element to force sidebar to shrink to fit close icon -->
                    </div>
                </Dialog>
            </TransitionRoot>

            <div v-if="isVerified" class="flex flex-col">
                <div class="bg-indigo-950 w-full" id="appHeader">
                    <div class="mx-auto w-full md:divide-y md:divide-gray-900 md:pl-6 md:pr-8">
                        <div class="relative h-14 md:h-16 flex justify-between">
                            <div class="flex items-center w-full justify-between">
                                <div
                                    class="border-b border-white border-opacity-5 md:border-none md:z-10 h-14 md:h-16 z-30 flex md:px-0' bg-indigo-950 top-0 md:top-auto md:bg-transparent md:h-8 py-2.5 w-full fixed"
                                >
                                    <div class="flex-shrink-0 flex items-center h-fit">
                                        <FontAwesomeIcon
                                            @click="sidebarOpen = true"
                                            icon="bars"
                                            class="h-5 w-5 block md:hidden ml-4 mt-2"
                                        />

                                        <img
                                            class="h-[1.7rem] absolute md:block md:left-0 top-1/2 -translate-y-1/2 md:translate-x-0 left-1/2 -translate-x-1/2 cursor-pointer"
                                            :src="heavenaccount"
                                            @click="router.push('/')"
                                            alt="Heavenland"
                                        />
                                    </div>
                                </div>

                                <div
                                    class="hidden md:flex justify-between md:border-b md:border-gray-500 md:border-opacity-10 w-full z-20 relative flex-col md:flex-row pt-16 md:pt-0 md:pb-2 ease-out mt-6 md:mt-0"
                                    :class="[isCollapsed && !error ? 'md:ml-20' : 'md:ml-64']"
                                >
                                    <div class="flex space-x-2">
                                        <div
                                            class="flex flex-col md:flex-row md:items-center md:space-x-2 space-y-1 md:space-y-0 text-xs items-center py-2 bg-indigo-930 rounded-md px-3.5 cursor-pointer"
                                            @click="copyClipboard(heavenlandId)"
                                        >
                                            <div class="flex items-center space-x-1.5">
                                                <FontAwesomeIcon :icon="['far', 'user-circle']" class="text-gray-400" />
                                                <span class="text-gray-400">Heavenland ID</span>
                                            </div>
                                            <span class="font-bold">{{ heavenlandId }}</span>
                                        </div>
                                        <div
                                            v-if="accountStore.accountWalletPublicKey"
                                            class="flex flex-col md:flex-row md:items-center md:space-x-2 space-y-1 md:space-y-0 text-xs items-center py-2 bg-indigo-930 rounded-md px-3.5 cursor-pointer"
                                            @click="copyClipboard(accountStore.accountWalletPublicKey)"
                                        >
                                            <div class="flex items-center space-x-1.5">
                                                <FontAwesomeIcon icon="wallet" class="text-gray-400" />
                                                <span class="text-gray-400">Wallet</span>
                                            </div>
                                            <span class="font-bold">
                                                {{ formatAddress(accountStore.accountWalletPublicKey) }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="hidden md:flex space-x-3 mt-3 md:mt-0">
                                        <AppButton @click="logout">
                                            <FontAwesomeIcon icon="sign-out-alt" class="mr-2" />
                                            <span>Logout</span>
                                        </AppButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    class="hidden md:flex md:flex-col md:fixed md:inset-y-0 ease-out"
                    :class="[{ 'md:w-0': isHidden }, isCollapsed ? 'md:w-20' : 'md:w-64']"
                >
                    <div
                        class="flex-1 flex flex-col min-h-0 bg-indigo-950 border-r border-gray-300 border-opacity-5"
                        v-if="!error"
                    >
                        <div class="flex-1 flex flex-col overflow-y-auto">
                            <nav class="flex-1 py-2 pt-4 px-3 mt-16">
                                <LayoutMenu />
                            </nav>
                        </div>
                    </div>
                </div>

                <div
                    class="flex flex-col flex-1 ease-out"
                    :class="[
                        { 'xl:pl-0': isHidden },
                        isCollapsed && !error ? 'md:pl-20' : isHidden ? 'md:pl-0' : !error ? 'md:pl-64' : '',
                    ]"
                >
                    <main id="appMain" class="py-5 pt-7 md:pt-6 sm:px-4 ease-out justify-center flex">
                        <div class="p-10 text-center flex flex-col" v-if="error">
                            <div class="text-center">
                                <img class="max-h-[300px] inline-block" alt="error" :src="err404" />
                            </div>

                            <span class="text-xl text-indigo-700 my-3 text-white font-semibold">
                                {{ error.message }}
                            </span>

                            <div class="mt-6">
                                <AppButton @click="router.push('/')">Back to homepage</AppButton>
                            </div>
                        </div>

                        <NuxtPage v-else />
                    </main>
                </div>
            </div>
        </div>

        <div class="absolute bottom-0 text-center px-4 px-0 right-6 py-3">
            <p class="text-xs text-gray-400">© All right reserved 2022</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import heavenaccount from '@/assets/logo/heavenaccount.png';
    import { useAuthStore } from '~/store/auth';
    import { onMounted, ref, useAuth, useSidebarLayout } from '#imports';
    import { useError, useRouter } from '#app';
    import err404 from '@/assets/404.png';
    import { NotificationManager } from '~/types/NotificationManager.types';
    import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from '@headlessui/vue';
    import Authentication from '~/components/Authentication.vue';
    import { copyClipboard } from '~/js/clipboard';
    import { formatAddress } from '~/js/formatting';
    import { useAccountStore } from '~/store/account';
    import LogoutModal from '~/components/LogoutModal.vue';

    const sidebarOpen = ref(false);
    const NM = NotificationManager.getInstance();
    const client = ref<Element | null>(null);
    const error = useError();
    const { isCollapsed, isHidden } = useSidebarLayout();
    const { isVerified, heavenlandId } = useAuth();

    const router = useRouter();

    const logoutModal = ref(false);

    const authStore = useAuthStore();
    const accountStore = useAccountStore();

    const logout = () => {
        logoutModal.value = true;
    };

    onMounted(() => {
        authStore.storeToken();
    });
</script>

<style scoped></style>
