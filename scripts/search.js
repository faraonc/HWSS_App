jQuery(document).ready(function($){


    Vue.component('search-page', require('../components/search-page.vue'));

    // var CACHED_DB;  // TODO cached DB variable, the WHOLE database, use query later

    // TODO implement date last, this one is tricky
    var vue = new Vue({
        el: '#searchPage',
        data: {
            categories: [
                {name: 'Publishers', component: 'add-publisher'},
                // {name: 'Date', component: 'add-date'},
                {name: 'File Types', component: 'add-file-type'},
                {name: 'Instruments', component: 'add-instrument'},
                {name: 'Regions', component: 'add-region'},
                {name: 'Sampling Rates', component: 'add-sampling-rate'}
            ],
            CACHED_DB: {},
            addCategoryBtnMsg: '',
            errorMsg: '',
            selectedCategories: [],
            publishers: [],
            fileTypes: [],
            instruments: [],
            regions: [],
            samplingRates: [],
            loadingCategories: false,
            disableSearch: false,
            disableCategoryBtn: false,
            queries: {}
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
                // console.log("after: ", this.categories); //TODO REMOVE
                // console.log("selected: ", this.selectedCategories);
            },
            processSelected: function(queryType, currentSet, selected) {
                var deleteSelected = false;

                for(var currSelection of currentSet) {
                    if(currSelection === selected) {
                        deleteSelected = true;
                        currentSet.delete(selected);
                    }
                }

                if(!deleteSelected) {
                    currentSet.add(selected);
                }
                this.queries[queryType] = currentSet;
            },
            parseData: function() {
                var self = this;
                var temp_file_types = new Set();
                var temp_instruments = new Set();
                var temp_regions = new Set();
                var temp_sampling_rate = new Set();

                this.CACHED_DB.forEach(function(currObj){
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
                self.fileTypes = Array.from(temp_file_types);
                self.instruments = Array.from(temp_instruments);
                self.regions = Array.from(temp_regions);
                self.samplingRates = Array.from(temp_sampling_rate);
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
                }

            }
        }
    });

}); // end of jquery ready document