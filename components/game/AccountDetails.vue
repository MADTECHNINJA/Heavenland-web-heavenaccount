<template>
    <GameProfileUpdateModal v-model="updateGameProfileModal" />

    <GameProfileCard
        class="mt-4"
        :paragon-data="gameProfileParagon.data()"
        :paragon-error="gameProfileParagon.error()"
        :paragon-fetched="gameProfileParagon.fetched()"
        :username="username"
        :nickname="nickname"
    />

    <div class="mt-6">
        <p class="text-sm text-gray-400">
            In case you want to change your paragon or nickname, click the button bellow.
        </p>
        <AppButton class="mt-6" @click="openModal"> Update game profile... </AppButton>
    </div>
</template>

<script lang="ts" setup>
    import { ref, computed } from '#imports';
    import { useAccountStore } from '~/store/account';
    import { mapState } from 'pinia';

    const updateGameProfileModal = ref(false);

    const openModal = () => {
        updateGameProfileModal.value = true;
    };

    const accountData = mapState(useAccountStore, {
        account: (store) => store.account,
        gameProfileParagon: (store) => store.gameProfileParagon,
    });

    const gameProfileParagon = mapState(useAccountStore, {
        fetched: (store) => store.gameProfileParagon.fetched,
        error: (store) => store.gameProfileParagon.error,
        data: (store) => store.gameProfileParagon.data,
    });

    const username = computed(() => {
        return accountData.account().data?.username;
    });

    const nickname = computed(() => {
        return accountData.account().data?.nickname;
    });
</script>

<style scoped></style>
