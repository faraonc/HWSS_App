<template>
    <span>
        <button type="button" class="btn btn-danger" data-type="minus"
                v-on:click="deleteCategory"><b>&#8212;</b></button>
        <button type="button" class="btn btn-secondary btn-lg category" disabled>{{category}}</button>
    </span>
</template>

<script>
    export default {
        name: "delete-button",
        props: ['category'],
        methods: {
            deleteCategory: function(event) {
                console.log(event.path[1])
                console.log(this.$parent.categories)

            }
        }
    }
</script>

<style scoped>
    button {
        cursor:pointer;
    }
    .category{
        cursor: default;
    }
</style>