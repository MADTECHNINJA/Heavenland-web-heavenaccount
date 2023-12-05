<template>
    <button
        type="button"
        @click.prevent="onClick"
        class="transition text-indigo-300 text-opacity-75 min-h-[36px] hover:brightness-125 inline-flex disabled:opacity-60 disabled:brightness-100 tracking-tight items-center justify-center py-2 text-sm font-medium rounded-md focus:outline-none"
        :disabled="loading"
    >
        <template v-if="!loading">
            <FontAwesomeIcon v-if="prependIcon" :icon="icon" class="mr-1" />
            <slot />
            <FontAwesomeIcon v-if="!prependIcon" :icon="icon" class="ml-1" />
        </template>
        <AppSpinner v-else />
    </button>
</template>

<script lang="ts" setup>
    const emits = defineEmits<{
        (e: 'click', p: any): void;
    }>();

    const props = withDefaults(
        defineProps<{
            loading?: boolean;
            icon: string;
            prependIcon?: boolean;
        }>(),
        {
            icon: 'chevron-right',
        }
    );

    const onClick = (p: any) => {
        if (!props.loading) {
            emits('click', p);
        }
    };
</script>

<style scoped></style>
