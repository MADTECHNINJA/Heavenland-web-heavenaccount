import { computed } from '#imports';
import { ClientType } from '~/types/URL.types';
import { useRoute } from '#app';

export default () => {
    const route = useRoute();

    const clientQuery = computed(() => {
        const clientQuery = route.query?.['client'];

        switch (clientQuery) {
            case ClientType.WEBAPP:
                return clientQuery;

            default:
                return null;
        }
    });

    const refCode = computed(() => {
        return Array.isArray(route.query?.['refCode'])
            ? route.query?.['refCode']?.[0] ?? null
            : route.query?.['refCode'] ?? null;
    });

    const isWebAppClient = computed(() => {
        return clientQuery.value === ClientType.WEBAPP;
    });

    const redirectQuery = computed(() => {
        return route.query?.['redirectTo'] ?? null;
    });

    return { isWebAppClient, refCode, redirectTo: redirectQuery };
};
