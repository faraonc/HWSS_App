<template>
    <span>
        <button type="button" class="btn btn-danger btn-sm" data-type="minus"
                @click="$emit('delete', $event)"><b>&#8212;</b></button>
        <button type="button" class="btn btn-secondary category" disabled>{{category}}</button>
    </span>
</template>

<script>
    export default {
        name: "delete-button",
        props: ['category']
    }
</script>

<style scoped>
    .btn-danger {
        cursor: pointer;
        margin-right: 10px;
    }
    .category {
        width: 182px;
    }

</style>