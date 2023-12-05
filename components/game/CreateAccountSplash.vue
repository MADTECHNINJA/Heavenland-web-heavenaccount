<template>
    <GameProfileCreateModal setup v-model="createAccountModal" @refetch="onDataRefetch" />

    <div class="mt-3">
        <p class="text-sm text-gray-400 leading-6">
            Your game profile has not been initialized yet. <br />Create your game profile to access the game with your
            account.
        </p>
        <AppButton class="mt-6" @click="openModal">Create game profile...</AppButton>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import { useAccountStore } from '~/store/account';

    const createAccountModal = ref(false);

    const openModal = () => {
        createAccountModal.value = true;
    };

    const accountStore = useAccountStore();

    const onDataRefetch = () => {
        accountStore.account.clear();
        accountStore.fetchAccount();
    };
</script>

<style scoped></style>
