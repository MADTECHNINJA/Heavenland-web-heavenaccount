<template>
    <AppContainer>
        <AppTitle class="mb-6">Inventory</AppTitle>

        <AppActionCard v-if="!isInventoryFetched" :type="AlertType.LOADING">
            <template #desc>Loading inventory...</template>
        </AppActionCard>

        <div v-else>
            <InventoryCard
                class="mb-5"
                description="Your Heavenaccount is 1:1 connected to your Solana wallet, so every NFT you hold or stake on your wallet belongs to the paired Heavenaccount. Next to NFTs, your Heavenaccount is allowed to keep some non-NFT assets like Avatars or Buildings, both accessible through Inventory.                "
                title="Inventory"
                disable-buttons
                :icon="['far', 'backpack']"
            />
            <InventoryCard
                :empty="userAvatars.data()?.length === 0"
                class="my-5"
                description="Avatar is your 3D representation in the game, and it's a fully rigged figure that moves as you command. You can create up to 5 custom avatars, store them in your Inventory and then select any Avatar to enter the game.                "
                title="Avatars"
                create-link="https://avatars.heavenland.io"
                explore-link="https://inventory.heavenland.io/avatars"
                :icon="['far', 'user-astronaut']"
            >
                <InventoryImage :data="userAvatars.data()" />
            </InventoryCard>

            <InventoryCard
                :empty="userBuildings.data()?.length === 0"
                class="my-5"
                description="If you own a Parcel (or Parcel Bucket), you can place a building on them. You can create up to 50 custom buildings and store them in your Inventory. When you approach your Parcel in the game, you can select the building from your Inventory and build it in just one click.                "
                create-link="https://inventory.heavenland.io/buildings"
                explore-link="https://inventory.heavenland.io/buildings"
                title="Buildings"
                :icon="['far', 'house-building']"
            >
                <InventoryImage :data="userBuildings.data()" />
            </InventoryCard>
        </div>
    </AppContainer>
</template>

<script lang="ts" setup>
    import { onMounted, computed } from 'vue';
    import { AlertType } from '~/types/Alert.utils';
    import { mapState } from 'pinia';
    import { useInventoryStore } from '~/store/inventory';

    const inventoryStore = useInventoryStore();

    const isInventoryFetched = computed(() => {
        return userAvatars.fetched() && userBuildings.fetched();
    });

    const userAvatars = mapState(useInventoryStore, {
        data: (store) => store.userAvatars.data,
        fetched: (store) => store.userAvatars.fetched,
        error: (store) => store.userAvatars.error,
    });

    const userBuildings = mapState(useInventoryStore, {
        data: (store) => store.userBuildings.data,
        fetched: (store) => store.userBuildings.fetched,
        error: (store) => store.userBuildings.error,
    });

    onMounted(() => {
        if (!userAvatars.fetched()) {
            inventoryStore.fetchAvatars();
        }
        if (!userAvatars.fetched()) {
            inventoryStore.fetchBuildings();
        }
    });
</script>
