jQuery(document).ready(function($){

    Vue.component('add-category-button', require('../components/add-category-button.vue'));
    Vue.component('add-publisher', require('../components/add-publisher.vue'));
    Vue.component('delete-button', require('../components/delete-button.vue'));

    var CACHED_DB;  // TODO cached DB variable

    var vue = new Vue({
        el: '.container',
        created: function() {
            $.ajax({
                url: "query/metadata?all",
                dataType: "json",
                timeout: 5000,
                success: function(result) {
                    CACHED_DB = result.result;
                    getPublishers();
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
            regions: []
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
            }
        }
    });



    // parse the global DB
    function getPublishers() {
        CACHED_DB.forEach(function(currObj, index) {
            var temp = {};
            temp['firstName'] = currObj.firstName;
            temp['lastName'] = currObj.pi;
            vue.publishers.push(temp)
        });
        vue.publishers = _.uniqBy(vue.publishers, 'lastName')
    }

}); // end of jquery ready document