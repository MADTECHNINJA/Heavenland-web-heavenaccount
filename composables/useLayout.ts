import { useRoute } from '#app';
import { computed } from 'vue';

export const useSidebarLayout = () => {
    const route = useRoute();

    const isCollapsed = computed(() => false);

    const isHidden = computed(() => {
        return route.path.includes('/account');
    });

    return {
        isCollapsed,
        isHidden,
    };
};
