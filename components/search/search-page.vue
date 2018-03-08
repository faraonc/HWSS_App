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
                <add-category-button @delete="deleteCategory" @checkedItem="processSelected" v-for="items in selectedCategories"
                                     v-bind:category="items.name" v-bind:component="items.component" v-bind:itemList="items.itemList"></add-category-button>

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
            var self = this;
            self.addCategoryBtnMsg = 'Processing...';
            self.disableSearch = true;
            self.disableCategoryBtn = true;
            self.loadingCategories = true;

            // query for all categories
            var queryResult = [], deferred, queryDeffereds = [];

            // when ajax calls are finished
            $(document).ajaxStop(function () {
                self.parseData(queryResult);
                self.pushToCategoryList();
                self.loadingCategories = false;
                self.disableSearch = false;
                self.disableCategoryBtn = false;
                self.addCategoryBtnMsg = 'Add Category';
                $(this).off("ajaxStop");
            });

            // start querying
            for (var i = 0; i < self.categories.length; i++) {
                if(self.categories[i].query !== "") {
                    deferred = $.ajax({
                        url: "query/metadata?" + self.categories[i].query,
                        dataType: "json",
                        success: function (result) {
                            queryResult.push(result.result);
                        }
                    });
                    queryDeffereds.push(deferred);
                }
            }
        },
        data: function() {
            return {
                categories: [
                    {name: 'Publishers', component: 'add-publisher', query: 'uniqNames'},
                    // {name: 'Date', component: 'add-date'},
                    {name: 'File Types', component: 'add-file-type', query: ''},
                    {name: 'Instruments', component: 'add-instrument', query: 'uniqInstruments'},
                    {name: 'Regions', component: 'add-region', query: 'uniqRegions'},
                    {name: 'Sampling Rates', component: 'add-sampling-rate', query: 'uniqSamplingRates'}
                ],
                addCategoryBtnMsg: '',
                errorMsg: '',
                selectedCategories: [],
                publishers: [],
                fileTypes: ['Audios', 'Videos', 'Files', 'Images'],
                instruments: [],
                regions: [],
                samplingRates: [],
                loadingCategories: false,
                disableSearch: false,
                disableCategoryBtn: false,
                queries: {}
            }
        },
        computed: {
            orderedCategories: function() {
                return _.orderBy(this.categories, 'name');
            }
        },
        methods: {
            addCategory: function(event) {
                var me = this;
                this.categories.forEach(function(category, index){
                    if(category.name === event.target.text) {
                        me.selectedCategories.push(category);
                        me.categories.splice(index, 1)  //remove it from dropdown menu
                    }
                });
            },
            deleteCategory: function(event) {
                var deleteVal = event.currentTarget.nextSibling.nextSibling.textContent;

                var self = this;
                self.selectedCategories.forEach(function(category, index) {  //TODO break if equaled, change to for loop
                    if(category.name === deleteVal) {
                        self.categories.push(category);           // add back to list of available categories
                        self.selectedCategories.splice(index, 1); // remove from list of added categories
                    }
                });
                self.errorMsg = '';
            },
            processSelected: function(queryType, currentSet, selectedItem) {
                var deleteSelected = false;

                for(var currSelection of currentSet) {
                    if(currSelection === selectedItem) {
                        deleteSelected = true;
                        currentSet.delete(selectedItem);
                    }
                }

                if(!deleteSelected) {
                    currentSet.add(selectedItem);
                }
                this.queries[queryType] = currentSet;
                console.log("after (parent): ", currentSet);
                console.log("query: ", this.queries);
            },
            parseData: function(queryResult) {
                var self = this;

                queryResult.forEach(function(currObj){
                    var tag = currObj[0];
                    if(tag === "regions") {
                        self.regions = currObj.slice(1);
                    }
                    else if(tag === "instruments") {
                        self.instruments = currObj.slice(1);
                    }
                    else if(tag === "samplingRates"){
                        self.samplingRates = currObj.slice(1);
                    }
                    else {
                        self.publishers = currObj;
                    }
                });
            },
            pushToCategoryList: function() {
                var self = this;
                this.categories.forEach(function(currObj) {
                    switch(currObj.query) {
                        case "uniqNames":
                            currObj.itemList = self.publishers;
                            break;
                        case "":
                            currObj.itemList = self.fileTypes;
                            break;
                        case "uniqInstruments":
                            currObj.itemList = self.instruments;
                            break;
                        case "uniqRegions":
                            currObj.itemList = self.regions;
                            break;
                        case "uniqSamplingRates":
                            currObj.itemList = self.samplingRates;
                    }
                });
            },
            beginSearch: function() {
                var self = this;
                var needToSelect = [];
                for (var i in this.selectedCategories) {
                    var name = this.selectedCategories[i].name.charAt(0).toLowerCase() +
                        this.selectedCategories[i].name.slice(1).replace(' ', '');
                    if(this.queries.hasOwnProperty(name)) {
                        if(this.queries[name].size === 0){
                            needToSelect.push(this.selectedCategories[i].name);
                        }
                    }
                    else {
                        needToSelect.push(this.selectedCategories[i].name);
                    }
                }
                console.log(needToSelect)
                if(needToSelect.length >0) {
                    this.errorMsg = '*Please select: ' + needToSelect.join(', ');
                }
                else {
                    this.errorMsg = '';
                    this.buildQueryString();
                    this.$router.push({name:'map', params: {queries: this.queries}});
                }

            },
            buildQueryString: function() {
                console.log("Query: ", this.queries);
            }
        }
    }
</script>

<style scoped>

</style>