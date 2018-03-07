
jQuery(document).ready(function($){

    const routes = [
        {path:'/map', component: Vue.component('map-component', require('../components/map/map-component.vue')) },
        {path:'/search', component: Vue.component('search-page', require('../components/search/search-page.vue')) }

    ];

    const router = new VueRouter({
        routes
    });

    // var CACHED_DB;  // TODO cached DB variable, the WHOLE database, use query later?

    // TODO implement date last, this one is tricky
    var vue = new Vue({
        router,
        created: function() {
            this.$router.push('/search');
        }
    }).$mount('#app');

}); // end of jquery ready document