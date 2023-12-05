import { useAuthStore } from '~/store/auth';
import { computed } from 'vue';

export const useAuth = () => {
    const authStore = useAuthStore();

    const heavenlandId = computed(() => {
        return authStore.decodedToken.data?.['sub'];
    });

    const isVerified = computed(() => {
        return authStore.decodedToken.data;
    });

    const isVerificationPending = computed(() => {
        return !authStore.decodedToken.fetched;
    });

    const isVerificationError = computed(() => {
        return authStore.decodedToken.error;
    });

    return {
        isVerified,
        isVerificationPending,
        isVerificationError,
        heavenlandId,
    };
};
