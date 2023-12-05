<template>
    <div>
        <div :class="color" class="space-x-1.5 items-center bg-opacity-10 my-0.5 rounded-lg px-6 w-full py-2.5 flex">
            <div class="flex text-sm w-full justify-center items-center font-medium md:my-0">
                <FontAwesomeIcon :icon="icon" class="h-3.5 w-3.5 mr-2" />
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { computed } from 'vue';

    const props = defineProps<{
        type?: string;
        icon?: string;
    }>();

    const color = computed(() => {
        switch (props.type) {
            case 'error':
                return 'text-red-500 bg-red-600';
            default:
                return 'text-amber-500 bg-amber-600';
        }
    });
</script>

<style></style>
