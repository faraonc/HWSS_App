<template>
    <div class="query-q-file">
        <a :href="file" target="_blank">mat_{{index + 1}}</a>
    </div>
</template>

<script>
    export default {
        name: "q-file",
        props: ['file','index']
    }
</script>

<style scoped>

</style>