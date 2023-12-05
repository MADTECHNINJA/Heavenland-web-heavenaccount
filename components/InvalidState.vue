<template>
    <div class="w-full bg-red-600 bg-opacity-20 w-full py-3 max-w-xl flex flex-col items-center mt-6">
        <FontAwesomeIcon icon="exclamation-triangle" class="text-red-500 h-7 w-7" />

        <div class="text-sm font-semibold text-red-500 mt-2 text-center">
            <p>Launching error</p>
        </div>
    </div>

    <p class="text-sm text-gray-400 mt-6 text-center leading-6 px-6">
        An error occurred while contacting server.<br />Please try again later.
    </p>
</template>

<script lang="ts" setup></script>

<style scoped></style>
