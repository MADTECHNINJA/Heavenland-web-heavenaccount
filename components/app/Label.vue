<template>
    <p class="text-start" :class="secondary ? 'text-xs text-gray-300' : 'text-sm text-gray-400 tracking-tight'">
        {{ title }}
    </p>
</template>

<script lang="ts" setup>
    defineProps<{
        title: string;
        secondary?: boolean;
    }>();
</script>

<style scoped></style>
