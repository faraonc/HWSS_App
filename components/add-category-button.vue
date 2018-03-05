<template>
    <div class="added-category">
        <delete-button v-bind:category="category"></delete-button>
        <my-component v-bind:is="component"></my-component>
    </div>
</template>

<script>
    import DeleteButton from "../components/delete-button.vue";

    export default {
        components: {DeleteButton},
        name: "add-category-button",
        props: ['category', 'component']
    }
</script>

<style scoped>
    button {
        cursor:pointer;
    }
    .added-category {
        text-align: left;
        margin-bottom: 20px;
    }
</style>