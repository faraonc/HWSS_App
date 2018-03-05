jQuery(document).ready(function($){

    Vue.component('add-category-button', require('../components/add-category-button.vue'));
    Vue.component('select-button', require('../components/select-button.vue'));

    // TODO put this as import from vue component add-category-button instead of global?
    Vue.component('add-publisher', require('../components/add-publisher.vue'));
    Vue.component('add-file-type', require('../components/add-file-type.vue'));

    var CACHED_DB;  // TODO cached DB variable, the WHOLE database, use query later

    // TODO implement date last, this one is tricky
    var vue = new Vue({
        el: '.container',
        created: function() {
            var self = this;
            self.loadingCategories = true;
            var self = this;
            $.ajax({
                url: "query/metadata?all",
                dataType: "json",
                timeout: 5000,
                success: function(result) {
                    CACHED_DB = result.result;
                    self.parseData();
                    self.loadingCategories = false;
                },
                error: function() {
                    console.log('error with quering DB, consult conard :)')
                }
            })
        },
        data: {
            categories: [
                {name: 'Publisher', component: 'add-publisher'},
                {name: 'Date', component: 'add-date'},
                {name: 'File Type', component: 'add-file-type'},
                {name: 'Instrument', component: 'add-instrument'},
                {name: 'Region', component: 'add-region'},
                {name: 'Sampling Rate', component: 'add-sampling-rate'}
            ],
            selectedCategories: [],
            publishers: [],
            fileTypes: [],
            instruments: [],
            regions: [],
            samplingRates: [],
            loadingCategories: false,
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

                CACHED_DB.forEach(function(currObj){
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
                self.instrument = Array.from(temp_instruments);
                self.regions = Array.from(temp_regions);
                self.samplingRate = Array.from(temp_sampling_rate);
            }
        }
    });

}); // end of jquery ready document