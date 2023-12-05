<template>
    <div
        class="flex text-start flex-col bg-gradient-to-r from-indigo-930 to-indigo-940 pt-4 pb-5 max-w-4xl px-6 rounded-b-xl mt-3 relative z-10 rounded-lg"
    >
        <div class="flex items-center justify-start space-x-2.5 mb-5">
            <FontAwesomeIcon :icon="['far', 'link']" class="text-gray-300 h-3.5" />
            <AppSectionTitle>Referrals</AppSectionTitle>
        </div>

        <p class="text-gray-400 text-sm tracking-tight">Invite your friends into Heavenland and get your reward!</p>

        <p v-if="referrerId" class="text-gray-400 text-sm tracking-tight mt-2">
            Your referrer: <span class="font-bold text-white">{{ formatAddress(referrerId) }}</span>
        </p>

        <div class="flex items-center mx-auto w-full max-w-xl md:mx-0 mt-6">
            <div class="mx-auto w-full">
                <FormKit disabled v-model="inviteLink" name="Invite link" />
            </div>
            <FontAwesomeIcon icon="copy" class="text-indigo-500 cursor-pointer py-3 px-4" @click="copyInviteLink" />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { copyClipboard } from '~/js/clipboard';
    import { computed } from 'vue';
    import { useAccountStore } from '~/store/account';
    import { formatAddress } from '~/js/formatting';

    const accountStore = useAccountStore();

    const refCode = computed(() => accountStore.account.data?.referralCode);
    const referrerId = computed(() => accountStore.account.data?.referrerId);
    const inviteLink = computed(() => import.meta.env.VITE_HL_ACCOUNT_URL + `?refCode=${refCode.value}`);

    const copyInviteLink = () => {
        copyClipboard(inviteLink.value);
    };
</script>

<style scoped></style>
