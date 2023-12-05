<template>
    <div
        v-if="item"
        class="rounded-lg p-0.5 max-w-sm max-h-sm aspect-square"
        :class="[
            !gameProfile && 'border',
            selected ? 'border-green-500 border border-opacity-100' : 'border-gray-400 border-opacity-[10%]',
        ]"
        @click="onParagonSelected"
    >
        <div
            class="flex items-center justify-center relative overflow-hidden mx-auto h-full w-full my-auto rounded-lg"
            :class="[{ 'animate-pulse': item.image && !loaded }, !gameProfile && 'cursor-pointer']"
        >
            <img
                v-if="item.image"
                class="aspect-square"
                v-lazy="{ src: lazyOptions.src, lifecycle: lazyOptions.lifecycle }"
                :class="{ 'opacity-0': !loaded }"
                :style="['height: ' + paragonSize + '%', 'width:' + paragonSize + '%']"
                :alt="item.data.name"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, computed } from 'vue';
    import { Paragon } from '~/types/Paragon.types';
    import { ImageResource } from '~/api/_services/NftService';
    import { API } from '~/api';

    const props = defineProps<{
        item?: Paragon;
        selected?: boolean;
        gameProfile?: boolean;
    }>();

    const emits = defineEmits<{
        (e: 'select', paragon: Paragon): void;
    }>();

    const paragonSize = computed(() => {
        if (!props.item || !props.gameProfile) {
            return 100;
        }

        switch (props.item.tier) {
            case 0:
                return 94;

            case 2:
            case 3:
            case 4:
            case 5:
                return 88;

            default:
                return 100;
        }
    });

    const onParagonSelected = () => {
        if (props.item) {
            emits('select', props.item);
        }
    };

    const loaded = ref(false);

    const lazyOptions = computed(() => {
        return {
            src: props.item
                ? API.NftService.getImage({
                      address: props.gameProfile ? props.item?.gameImage : props.item?.image,
                      resource: ImageResource.URL,
                  })
                : null,
            lifecycle: {
                loading: () => {
                    loaded.value = false;
                },
                loaded: () => {
                    loaded.value = true;
                },
            },
        };
    });
</script>

<style scoped></style>
