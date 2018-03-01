jQuery(document).ready(function($){

    Vue.component('delete-button', require('../components/delete-button.vue'));

    new Vue({
        el: '.container',
        data: {
            categories: [
                {name: 'Publisher', templateUrl: 'pages/add_contributor.html'},
                {name: 'Date', templateUrl: 'pages/add_date.html'},
                {name: 'File Type', templateUrl: 'pages/add_file_type.html'},
                {name: 'Instrument', templateUrl: 'pages/add_instrument.html'},
                {name: 'Region', templateUrl: 'pages/add_region.html'},
                {name: 'Sampling Rate', templateUrl: 'pages/add_sampling.html'}
            ],
            selectedCategories: []

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
                        me.selectedCategories.push(category.name);
                        me.categories.splice(index, 1)  //remove it from dropdown menu
                    }
                });
                // console.log("after: ", this.categories); //TODO REMOVE
                // console.log("selected: ", this.selectedCategories);
            }
        }
    })

}); // end of jquery ready document