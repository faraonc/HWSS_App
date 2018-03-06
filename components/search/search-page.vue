<template>
    <div class="container" id="searchPage">
        <h1>Search</h1>
        <div class="category-dropdown-container">
            <div class="btn-group">
                <!-- 'Add Category' Dropdown -->
                <button class="btn btn-secondary btn-lg dropdown-toggle" type="button" id="dropdownMenuButton"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-bind:disabled="this.$root.disableCategoryBtn === true">
                    {{this.$root.addCategoryBtnMsg}}
                </button>

                <!-- Dropdown menu options-->
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="#" v-on:click="addCategory" v-for="category in this.$root.orderedCategories">{{category.name}}</a>
                </div>

                <!--'Show All' or 'Search Button'-->
                <button type="button" class="btn btn-secondary btn-lg search" v-on:click="this.$root.beginSearch"
                        v-bind:disabled="this.$root.disableSearch === true">
                    Search
                </button>
            </div><!-- end of dropdown container-->

            <div class="error-msg">{{this.$root.errorMsg}}</div>

            <div class="loader" v-show="this.$root.loadingCategories === true">
                <img src="/public/loading.gif">
            </div>


            <!--dynamically add selected categories-->
            <div class="added-categories">
                <add-category-button v-for="items in this.$root.selectedCategories"
                                     v-bind:category="items.name" v-bind:component="items.component"></add-category-button>

                <!--v-bind:category="items.name" v-bind:component="items.component"-->
            </div>
        </div> <!-- end of category-dropdown-container -->
    </div>
</template>

<script>
    import AddCategoryButton from './add-category-button.vue';
    export default {
        components: {AddCategoryButton},
        name: "search-page",
        created: function() {
            var self = this.$root;
            self.addCategoryBtnMsg = 'Processing...';
            self.disableSearch = true;
            self.disableCategoryBtn = true;
            self.loadingCategories = true;
            $.ajax({
                url: "query/metadata?all",
                dataType: "json",
                timeout: 5000,
                success: function(result) {
                    self.CACHED_DB = result.result;
                    self.parseData();
                    self.loadingCategories = false;
                    self.disableSearch = false;
                    self.disableCategoryBtn = false;
                    self.addCategoryBtnMsg = 'Add Category';
                },
                error: function() {
                    console.log('error with quering DB, consult conard :)')
                }
            })
        },
        methods: {
            addCategory: function(event) {
                this.$root.addCategory(event);
            }
        }
    }
</script>

<style scoped>

</style>