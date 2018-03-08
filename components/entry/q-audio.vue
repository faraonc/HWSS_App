<template>
    <audio controls>
        <source :src="audio">
    </audio>
</template>

<script>
    // noinspection JSAnnotator
    export default {
        name: "q-audio",
        props: ["audio"]
    }
</script>

<style scoped>

</style>