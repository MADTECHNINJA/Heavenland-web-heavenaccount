<template>
    <GamePasswordChangeModal v-model="passwordChangeModal" />

    <div
        class="flex text-start flex-col relative bg-gradient-to-r from-indigo-930 to-indigo-940 pt-4 pb-5 max-w-4xl px-6 rounded-b-xl mt-3 relative z-10 rounded-lg"
    >
        <div class="flex items-center justify-start space-x-2.5 mb-5">
            <FontAwesomeIcon :icon="['far', 'key']" class="text-gray-300 h-3.5" />
            <AppSectionTitle>Password</AppSectionTitle>
        </div>

        <p class="text-gray-400 mb-6 text-sm tracking-tight">
            In case your want se set up new password, click the button below.
        </p>

        <div>
            <AppButton @click="openModal">Change password</AppButton>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';

    const passwordChangeModal = ref(false);

    const openModal = () => {
        passwordChangeModal.value = true;
    };
</script>

<style scoped></style>
