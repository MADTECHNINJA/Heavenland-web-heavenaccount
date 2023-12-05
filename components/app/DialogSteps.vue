<template>
    <div class="mt-2">
        <div class="block">
            <div class="border-b border-gray-300 scroll-smooth border-opacity-[10%]">
                <nav
                    :class="
                        steps.data.length > 3 &&
                        'overflow-x-scroll  custom-scrollbar flex md:block justify-center  md:overflow-x-hidden  overflow-y-hidden'
                    "
                    class="-mb-px flex space-x-8"
                    aria-label="Tabs"
                >
                    <button
                        :disabled="order"
                        v-for="(step, index) in steps.data"
                        :key="step.title"
                        :class="[
                            steps.data.length > 3 &&
                                step.active.value &&
                                'px-4 bg-indigo-600 rounded-md md:px-auto  md:rounded-none md:bg-transparent',
                            step.active.value
                                ? 'border-gray-300   text-gray-300 font-medium'
                                : 'border-transparent text-gray-500',
                            'whitespace-nowrap py-3 md:px-1 md:border-b text-sm ',
                            !order && 'cursor-pointer  hover:text-gray-300 hover:border-gray-300',
                        ]"
                        :aria-current="step.active ? 'page' : undefined"
                        @click="onTabSelected(step.title)"
                    >
                        <span>{{ order ? index + 1 + '. ' : '' }} </span>
                        <span :class="steps.data.length > 3 && 'hidden md:inline-block'"> {{ step.title }}</span>
                    </button>
                </nav>
            </div>
        </div>

        <slot />
    </div>
</template>

<script lang="ts" setup>
    import { Steps } from '~/types/Steps.types';

    const props = defineProps<{
        steps: Steps;
        order: boolean;
    }>();

    const onTabSelected = (title: string) => {
        if (!props.order) {
            props.steps.select(title);
        }
    };
</script>

<style scoped></style>
