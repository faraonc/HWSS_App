<template>
    <div class="container" id="searchPage">
        <h1>Search</h1>
        <div class="category-dropdown-container">
            <div class="btn-group">
                <!-- 'Add Category' Dropdown -->
                <button class="btn btn-secondary btn-lg dropdown-toggle" type="button" id="dropdownMenuButton"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-bind:disabled="disableCategoryBtn === true">
                    {{addCategoryBtnMsg}}
                </button>

                <!-- Dropdown menu options-->
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="#" v-on:click="addCategory" v-for="category in orderedCategories">{{category.name}}</a>
                </div>

                <!--'Show All' or 'Search Button'-->
                <button type="button" class="btn btn-secondary btn-lg search" v-on:click="beginSearch"
                        v-bind:disabled="disableSearch === true">
                    Search
                </button>
            </div><!-- end of dropdown container-->

            <div class="error-msg">{{errorMsg}}</div>

            <div class="loader" v-show="loadingCategories === true">
                <img src="/public/loading.gif">
            </div>


            <!--dynamically add selected categories-->
            <div class="added-categories">
                <add-category-button v-for="items in selectedCategories"
                                     v-bind:category="items.name" v-bind:component="items.component"></add-category-button>

                <!--v-bind:category="items.name" v-bind:component="items.component"-->
            </div>
        </div> <!-- end of category-dropdown-container -->
    </div>
</template>

<script>
    import AddCategoryButton from '../components/search/add-category-button.vue';
    export default {
        components: [AddCategoryButton],
        name: "search-page"
    }
</script>

<style scoped>

</style>