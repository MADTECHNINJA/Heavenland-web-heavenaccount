<template>
    <main id="appMain" class="w-screen h-screen flex items-center justify-center">
        <div
            class="m-3 bg-gradient-to-r w-full py-3 max-w-xl flex flex-col from-indigo-920 items-center to-indigo-940 rounded-xl mt-3"
        >
            <div class="w-full pt-3 pb-4">
                <div class="flex justify-center mb-5">
                    <img class="h-7" :src="heavenaccount" alt="Heavenland" />
                </div>

                <LoadingState v-if="isVerificationPending" />
                <InvalidState v-else />
            </div>
        </div>
    </main>
</template>

<script lang="ts" setup>
    import heavenaccount from '@/assets/logo/heavenaccount.png';
    import { useAuth } from '#imports';
    import LoadingState from '~/components/LoadingState.vue';
    import InvalidState from '~/components/InvalidState.vue';

    const { isVerificationPending } = useAuth();
</script>

<style scoped></style>
