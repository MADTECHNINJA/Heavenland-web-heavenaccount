<template>
    <Popper hover :disabled="disabled">
        <slot />

        <template #content>
            <slot v-if="$slots.text" name="text" />
            <span v-else v-html="text" />
        </template>
    </Popper>
</template>

<script lang="ts" setup>
    import Popper from 'vue3-popper';

    defineProps<{
        text: string;
        disabled?: boolean;
    }>();
</script>

<style lang="postcss">
    div.popper {
        @apply text-xs;
    }
</style>

<style>
    :root {
        --popper-theme-background-color: #1c1c1c;
        --popper-theme-background-color-hover: #333333;
        --popper-theme-text-color: #ffffff;
        --popper-theme-border-width: 0px;
        --popper-theme-border-style: solid;
        --popper-theme-border-radius: 6px;
        --popper-theme-padding: 8px;
        --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
    }
</style>
