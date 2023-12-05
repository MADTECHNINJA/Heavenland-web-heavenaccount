<template>
    <div
        class="shadow-md md:w-2/3 p-5 bg-gradient-to-r flex text-start flex-col pt-4 pb-5 max-w-4xl px-6 from-indigo-930 to-indigo-940 rounded-b-xl relative z-10 rounded-lg"
    >
        <div class="flex w-full pb-1 space-x-2.5 items-center">
            <FontAwesomeIcon :icon="icon" class="text-gray-300 h-3.5" />
            <h2 class="font-bold tracking-tight text-md">{{ title }}</h2>
        </div>

        <p class="text-gray-400 my-2 tracking-tight text-sm">{{ description }}</p>

        <div v-if="!empty">
            <slot></slot>
        </div>

        <div class="text-gray-300 text-sm mt-4" v-else>
            <div class="flex font-medium space-x-1.5 mb-3 tracking-tight items-center">
                <FontAwesomeIcon :icon="['far', 'empty-set']" class="h-3" />
                <p>
                    You don't have any <span class="lowercase">{{ title }}</span> yet
                </p>
            </div>
        </div>

        <div v-if="!disableButtons" class="w-full flex space-x-6 items-center justify-start mt-3">
            <AppButton v-if="createLink" @click="redirect(createLink)">Create</AppButton>

            <AppSecondaryButton v-if="!empty && exploreLink" @click="redirect(exploreLink)"
                >Explore
            </AppSecondaryButton>
        </div>
    </div>
</template>

<script lang="ts" setup>
    defineProps<{
        empty?: boolean;
        title: string;
        createLink?: string;
        exploreLink?: string;
        icon: Array<string>;
        description: string;
        disableButtons?: boolean;
    }>();

    const redirect = (link?: string) => {
        if (link) {
            window.open(link, '_blank');
        }
    };
</script>

<style></style>
