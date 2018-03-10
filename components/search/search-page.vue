<template>
    <div class="container" id="searchPage">
        <h1>HWSS Search</h1>
        <div class="category-dropdown-container">
            <div class="btn-group">
                <!-- 'Add Category' Dropdown -->
                <button class="btn btn-secondary btn-lg dropdown-toggle" type="button" id="dropdownMenuButton"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                        v-bind:disabled="disableCategoryBtn === true">
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
                <img src="/public/loading.gif" width="200">
            </div>


            <!--dynamically add selected categories-->
            <div class="added-categories">
                <add-category-button @delete="deleteCategory" @checkedItem="processSelected"
                                     v-for="items in selectedCategories"
                                     v-bind:category="items.name" v-bind:component="items.component"
                                     v-bind:itemList="items.itemList"></add-category-button>

                <!--v-bind:category="items.name" v-bind:component="items.component"-->
            </div>
        </div> <!-- end of category-dropdown-container -->
        <div class="footer">
            <hr>
            <p>2018 by Conard Faraon, Lisa Kim, Pouria Ghadimi &nbsp;&nbsp;|&nbsp;&nbsp; <a href="/api.html" target="_blank">API Development</a></p>
        </div>
    </div>
</template>

<script>
    import AddCategoryButton from './add-category-button.vue';

    export default {
        components: {AddCategoryButton},
        name: "search-page",
        created: function () {
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
                if (self.categories[i].query !== "") {
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
        data: function () {
            return {
                categories: [
                    {name: 'Publishers', component: 'add-publisher', query: 'uniqNames', key: "publisher"},
                    // {name: 'Date', component: 'add-date'},
                    // {name: 'File Types', component: 'add-file-type', query: '', key: "fileType"},
                    {name: 'Instruments', component: 'add-instrument', query: 'uniqInstruments', key: "instrument"},
                    {name: 'Regions', component: 'add-region', query: 'uniqRegions', key: "region"},
                    {
                        name: 'Sampling Rates',
                        component: 'add-sampling-rate',
                        query: 'uniqSamplingRates',
                        key: "samplingRate"
                    }
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
            orderedCategories: function () {
                return _.orderBy(this.categories, 'name');
            }
        },
        methods: {
            addCategory: function (event) {
                var me = this;
                this.categories.forEach(function (category, index) {
                    if (category.name === event.target.text) {
                        me.selectedCategories.push(category);
                        me.categories.splice(index, 1)  //remove it from dropdown menu
                    }
                });
            },
            deleteCategory: function (event) {
                var deleteVal = event.currentTarget.nextSibling.nextSibling.textContent;

                var self = this;
                self.selectedCategories.forEach(function (category, index) {  //TODO break if equaled, change to for loop
                    if (category.name === deleteVal) {
                        self.categories.push(category);           // add back to list of available categories
                        self.selectedCategories.splice(index, 1); // remove from list of added categories
                    }
                });
                self.errorMsg = '';
            },
            processSelected: function (queryType, currentSet, selectedItem) {
                var deleteSelected = false;

                for (var currSelection of currentSet) {
                    if (currSelection === selectedItem) {
                        deleteSelected = true;
                        currentSet.delete(selectedItem);
                    }
                }

                if (!deleteSelected) {
                    currentSet.add(selectedItem);
                }
                this.queries[queryType] = currentSet;
                console.log("after (parent): ", this.queries);
            },
            parseData: function (queryResult) {
                var self = this;

                queryResult.forEach(function (currObj) {
                    var tag = currObj[0];
                    if (tag === "regions") {
                        self.regions = currObj.slice(1);
                    }
                    else if (tag === "instruments") {
                        self.instruments = currObj.slice(1);
                    }
                    else if (tag === "samplingRates") {
                        self.samplingRates = currObj.slice(1);
                    }
                    else {
                        self.publishers = currObj;
                    }
                });
            },
            pushToCategoryList: function () {
                var self = this;
                this.categories.forEach(function (currObj) {
                    switch (currObj.query) {
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
            beginSearch: function () {
                var self = this;
                var needToSelect = [];

                if (self.selectedCategories.length === 0) {
                    this.$router.push({name: 'map', params: {queries: "query/metadata?all"}});
                } else {

                    for (var i in self.selectedCategories) {
                        var key = self.selectedCategories[i].key;
                        if (this.queries.hasOwnProperty(key)) {
                            if (this.queries[key].size === 0) {
                                needToSelect.push(self.selectedCategories[i].name);
                            }
                        }
                        else {
                            needToSelect.push(self.selectedCategories[i].name);
                        }
                    }
                    if (needToSelect.length > 0) {
                        this.errorMsg = '*Please select: ' + needToSelect.join(', ');
                    }
                    else {
                        this.errorMsg = '';
                        this.$router.push({name: 'map', params: {queries: this.buildQueryString()}});
                    }
                }
            },
            buildQueryString: function () {
                var self = this;
                var queryString = "query/metadata?";
                Object.keys(self.queries).forEach(function (currKey) {

                    if (queryString[queryString.length - 1] !== "?") {
                        queryString += "&";
                    }

                    if (currKey === "publisher") {
                        var pi = [];                // last name
                        var firstName = [];

                        self.queries[currKey].forEach(function (currVal) {
                            pi.push(currVal.lastName);
                            firstName.push(currVal.firstName);
                        });
                        queryString += "pi=" + pi.join(',');
                        queryString += "&firstName=" + firstName.join(',');
                    }
                    else {
                        queryString += currKey + "=" + Array.from(self.queries[currKey]).join(',');
                    }
                });
                console.log("Built Query: ", queryString);
                return queryString;
            }
        }
    }
</script>

<style scoped>

</style>