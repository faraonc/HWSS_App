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
                var deleteVal = event.currentTarget.nextSibling.nextSibling.textContent;
                var me = this;
                this.$root.selectedCategories.forEach(function(category, index) {
                    if(category.name === deleteVal) {
                        me.$root.categories.push(category);           // add back to list of available categories
                        me.$root.selectedCategories.splice(index, 1); // remove from list of added categories
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .btn-danger {
        cursor: pointer;
        margin-right: 10px;
    }

</style>