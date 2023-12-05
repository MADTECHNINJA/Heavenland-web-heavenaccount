<template>
    <AppContainer>
        <AppTitle class="mb-6">Account</AppTitle>

        <AppActionCard v-if="account.error()" :type="AlertType.ERROR">
            <template #desc>{{ ErrorMsg.FETCHING_ERROR }}</template>
        </AppActionCard>

        <AppActionCard v-else-if="!account.fetched()" :type="AlertType.LOADING">
            <template #desc>Loading account settings...</template>
        </AppActionCard>

        <div v-else>
            <DashboardGameAccountBox />
            <DashboardPasswordBox v-if="accountStore.isReadyForGameLogin" />
            <DashboardReferralBox />
            <DashboardWalletBox />
        </div>
    </AppContainer>
</template>

<script lang="ts" setup>
    import { onMounted } from 'vue';
    import { useAccountStore } from '~/store/account';
    import { AlertType } from '~/types/Alert.utils';
    import { ErrorMsg } from '~/locales/core';
    import { mapState } from 'pinia';

    // Temp comment for merging staging -> production
    const accountStore = useAccountStore();

    const account = mapState(useAccountStore, {
        fetched: (store) => store.account.fetched,
        error: (store) => store.account.error,
    });

    onMounted(() => {
        accountStore.fetchAccount();
    });
</script>

<style scoped></style>
