<template>
    <nav class="flex flex-col mt-4 md:mt-0 mx-2 md:mx-2 space-y-2" aria-label="Sidebar">
        <template v-if="currentRoute.path.includes('/account') && mobile">
            <h1 class="ml-5 mb-2 mt-3 text-sm">Market menu</h1>
            <!-- TODO v-slot="{ route }"-->
            <NuxtLink
                v-slot="{ route }"
                v-for="tab in appNavigation"
                :key="tab.path"
                :to="tab.path"
                @click="$emit('update:open', false)"
            >
                <div
                    class="app-sidebar__item hover:text-gray-400 hover:border-gray-"
                    :class="{ active: computeRoute(route), 'justify-center': isCollapsed && !mobile }"
                >
                    <div class="min-w-[25px] flex justify-center">
                        <FontAwesomeIcon :icon="['fad', tab.icon]" />
                    </div>
                    <span v-if="!isCollapsed || mobile" class="mx-2 text-sm font-normal tracking-tight">
                        {{ tab.name }}
                    </span>
                    <span v-if="!isCollapsed" class="flex-grow text-right"> </span>
                </div>
            </NuxtLink>
        </template>
        <template v-else>
            <NuxtLink
                v-for="tab in navigationItems"
                :key="tab.path"
                :to="tab.path"
                @click="$emit('update:open', false)"
                v-slot="{ route }"
            >
                <div
                    class="app-sidebar__item hover:text-gray-400 hover:border-gray-"
                    :class="{ active: computeRoute(route), 'justify-center': isCollapsed && !mobile }"
                >
                    <div class="min-w-[25px] flex justify-center">
                        <FontAwesomeIcon :icon="['fad', tab.icon]" />
                    </div>
                    <span v-if="!isCollapsed || mobile" class="mx-2 text-sm font-normal tracking-tight">
                        {{ tab.name }}
                    </span>
                    <span v-if="!isCollapsed" class="flex-grow text-right"> </span>
                </div>
            </NuxtLink>
        </template>
    </nav>
</template>

<script lang="ts" setup>
    import { useRoute } from '#app';
    import { computed } from 'vue';
    import { appNavigation } from '@/js/navigation';
    import { useSidebarLayout } from '~/composables/useLayout';
    import { RouteRecordRaw } from 'vue-router';

    const currentRoute = useRoute();
    const { isCollapsed } = useSidebarLayout();

    defineProps<{
        mobile?: boolean;
    }>();

    const computeRoute = (route: RouteRecordRaw) => {
        if (currentRoute.path.includes('/inventory') && route.path == '/inventory') {
            return true;
        } else if (currentRoute.path === '/' && route.path == '/') {
            return true;
        }
    };

    const navigationItems = computed(() => {
        return appNavigation;
    });
</script>

<style scoped lang="postcss">
    .app-sidebar__item {
        @apply bg-indigo-950 flex items-center px-4 py-3 rounded-md text-gray-300;
    }

    .app-sidebar__item:first-child {
        @apply mt-0;
    }

    .app-sidebar__item:last-child {
        @apply mb-0;
    }

    .app-sidebar__item.active {
        @apply text-white border-indigo-600 bg-gradient-to-r from-indigo-600 to-indigo-900 bg-opacity-50;
    }

    .app-sidebar__item.active span {
        @apply font-semibold;
    }
</style>
