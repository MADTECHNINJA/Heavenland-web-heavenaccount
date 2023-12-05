<template>
    <div v-if="data" class="my-2">
        <div class="inline-block mt-2 h-12 w-12 mx-1" v-for="item in data" :key="item.thumbnail">
            <img
                class="object-fill h-full w-full rounded-md"
                alt="Inventory item"
                v-if="item.thumbnail"
                :src="item.thumbnail"
            />
            <div class="animate-pulse bg-indigo-910 rounded-md h-12 w-12" v-else></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { Avatar, Building } from '~/types/Inventory.types';

    defineProps<{
        data: Array<Avatar | Building> | null;
    }>();
</script>

<style></style>
