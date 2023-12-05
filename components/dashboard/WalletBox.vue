<template>
    <div
        class="flex mt-3 text-start shadow flex-col pb-5 max-w-4xl bg-gradient-to-r from-indigo-930 to-indigo-940 rounded-b-xl mt-3 relative z-10 rounded-lg"
    >
        <div
            class="w-full space-x-1.5 mb-5 font-semibold items-center px-6 text-amber-500 bg-amber-600 bg-opacity-10 text-xs w-full py-2.5 rounded-t-lg flex"
        >
            <FontAwesomeIcon :icon="['fad', 'hourglass-half']" class="cursor-not-allowed h-2.5 w-2.5" />

            <span>Coming soon</span>
        </div>

        <div class="flex px-6 items-center justify-start space-x-2.5 mb-5">
            <FontAwesomeIcon :icon="['far', 'wallet']" class="text-gray-300 h-3.5 mb-[0.07rem]" />
            <AppSectionTitle>Wallets</AppSectionTitle>
        </div>

        <div>
            <div class="mb-6 px-6">
                <p class="text-sm text-gray-400">
                    Multiple wallets can be connected to your account. You can see your connected wallets below.
                </p>
                <div class="flex items-center space-x-3 mx-auto w-full max-w-xl md:mx-0 mt-6">
                    <AppButton disabled icon="plus">Add wallet</AppButton>
                    <div class="text-xs space-x-3 flex items-center bg-indigo-900 bg-opacity-30 px-4 py-2.5 rounded-md">
                        <div class="flex items-center space-x-2">
                            <FontAwesomeIcon icon="wallet" class="text-gray-400 h-3 w-3" />

                            <span class="font-normal">{{ wallet }}</span>
                        </div>
                        <!--                        <FontAwesomeIcon
                            icon="trash"
                            class="text-red-500 cursor-not-allowed h-3 w-3"
                            @click="removeWallet(wallet)"
                        />-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { useAccountStore } from '~~/store/account';
    import { computed } from 'vue';

    const accountStore = useAccountStore();

    const wallet = computed(() => accountStore.accountWalletPublicKey);
</script>

<style scoped></style>
