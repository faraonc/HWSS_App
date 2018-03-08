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
            var queryResult = [], queryDeferred, queryDeffereds = [];

            // runs when all ajax queries for mc/cc gens are finished, and resets it back
            $(document).ajaxStop(function () {
                self.parseData(queryResult);
                self.loadingCategories = false;
                self.disableSearch = false;
                self.disableCategoryBtn = false;
                self.addCategoryBtnMsg = 'Add Category';
                $(this).off("ajaxStop");
            });

            // start querying
            for (var i = 0; i < self.categories.length; i++) {
                deferred = $.ajax({
                    url: "query/metadata?" + self.categories[i].query,
                    dataType: "json",
                    success: function (result) {
                        queryResult.push(result);
                    }
                });
                queryDeffereds.push(queryDeferred);
            }
        },
        data: function() {
            return {
                categories: [
                    {name: 'Publishers', component: 'add-publisher', query: 'uniqNames'},
                    // {name: 'Date', component: 'add-date'},
                    {name: 'File Types', component: 'add-file-type', query: 'uniqFileTypes'},
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
            },
            parseData: function(queryResult) {
                var self = this;
                var temp_file_types = new Set();
                var temp_instruments = new Set();
                var temp_regions = new Set();
                var temp_sampling_rate = new Set();

                queryResult.forEach(function(currObj){
                    var temp_publishers = {};

                    temp_publishers['firstName'] = currObj.firstName;
                    temp_publishers['lastName'] = currObj.pi;

                    // TODO change dataType key from shorthand to actual, i = images, so i dont have to convert here
                    var dataType = currObj.dataType;
                    if(dataType === 'i') {
                        temp_file_types.add("Images");
                    }
                    else if(dataType === 's') {
                        temp_file_types.add("Source Codes");
                    }
                    else if(dataType === 'a') {
                        temp_file_types.add("Audio")
                    }

                    temp_instruments.add(currObj.sensorName);
                    temp_regions.add(currObj.region);
                    temp_sampling_rate.add(currObj.samplingRate);

                    self.publishers.push(temp_publishers);
                });
                self.publishers = _.uniqBy(self.publishers, 'lastName');
                self.categories[0].itemList = self.publishers;

                self.fileTypes = Array.from(temp_file_types);
                self.categories[1].itemList = self.fileTypes;

                self.instruments = Array.from(temp_instruments);
                self.categories[2].itemList = self.instruments;

                self.regions = Array.from(temp_regions);
                self.categories[3].itemList = self.regions;

                self.samplingRates = Array.from(temp_sampling_rate);
                self.categories[4].itemList = self.samplingRates;
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
                    this.$router.push({name:'map', params: {queries: this.queries}});
                }

            }
        }
    }
</script>

<style scoped>

</style>