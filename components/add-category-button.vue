<template>
    <div class="added-category">
            <!--<button type="button" class="btn btn-danger" data-type="minus"-->
                    <!--v-on:click="deleteCategory"><b>&#8212;</b></button>-->
            <!--<button type="button" class="btn btn-secondary btn-lg category" disabled>{{category}}</button>-->
            <delete-button v-bind:category="category"></delete-button>

        <my-component v-bind:is="component"></my-component>
    </div>
</template>

<script>
    export default {
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