<template>
    <div
        class="flex text-start shadow flex-col pt-4 pb-5 max-w-4xl px-6 bg-gradient-to-r from-indigo-930 to-indigo-940 rounded-b-xl relative z-10 rounded-lg"
    >
        <div class="flex items-center justify-start space-x-2.5 mb-1">
            <FontAwesomeIcon :icon="['far', 'gamepad-modern']" class="text-gray-300 h-3.5 mb-[0.07rem]" />
            <AppSectionTitle>Game profile</AppSectionTitle>
        </div>

        <GameCreateAccountSplash v-if="!accountStore.isReadyForGameLogin" />
        <GameAccountDetails v-else />
    </div>
</template>

<script lang="ts" setup>
    import { useAccountStore } from '~/store/account';

    const accountStore = useAccountStore();
</script>

<style scoped></style>
