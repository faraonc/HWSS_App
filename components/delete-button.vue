<template>
    <div class="added-category">
            <button type="button" class="btn btn-danger" data-type="minus"
                    v-on:click="deleteCategory"><b>&#8212;</b></button>
            <button type="button" class="btn btn-secondary btn-lg category" disabled>{{category}}</button>

        <my-component v-bind:is="component"></my-component>
    </div>
</template>

<script>
    export default {
        name: "delete-button",
        props: ['category', 'component'],
        methods: {
            deleteCategory: function(event) {
                var deleteVal = event.currentTarget.nextSibling.nextSibling.textContent;
                var me = this;
                this.$parent.selectedCategories.forEach(function(category, index) {
                    if(category.name === deleteVal) {
                        me.$parent.categories.push(category);           // add back to list of available categories
                        me.$parent.selectedCategories.splice(index, 1); // remove from list of added categories
                    }
                });
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
    .added-category {
        text-align: left;
        margin-bottom: 20px;
    }
    .added-category .btn-danger {
        margin-right: 10px;
    }

    .added-category .category {
        margin-right: 20px;
        width: 200px;
    }

    .added-category .dropdown-toggle {
        width: 220px;
    }
</style>