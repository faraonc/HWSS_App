jQuery(document).ready(function($){

    Vue.component('delete-button', require('../components/delete-button.vue'));
    Vue.component('add-publisher', require('../components/add-publisher.vue'))
    new Vue({
        el: '.container',
        data: {
            categories: [
                {name: 'Publisher', component: 'add-publisher'},
                {name: 'Date', component: 'add-date'},
                {name: 'File Type', component: 'add-file-type'},
                {name: 'Instrument', component: 'add-instrument'},
                {name: 'Region', component: 'add-region'},
                {name: 'Sampling Rate', component: 'add-sampling-rate'}
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
                        me.selectedCategories.push(category);
                        me.categories.splice(index, 1)  //remove it from dropdown menu
                    }
                });
                // console.log("after: ", this.categories); //TODO REMOVE
                // console.log("selected: ", this.selectedCategories);
            }
        }
    })

}); // end of jquery ready document