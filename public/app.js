
jQuery(document).ready(function($){

    const router = new VueRouter({
        // mode: 'history',
        routes: [
            {path:'/map', name: 'map', component: Vue.component('map-component', require('../components/map/map-component.vue')), props: true },
            {path:'', component: Vue.component('search-page', require('../components/search/search-page.vue')) },
            {path:'/register', component: Vue.component('register', require('../components/register.vue'))},
            {path:'/upload', component: Vue.component('upload', require('../components/upload.vue'))},
            {path:'*', component: Vue.component('not-found', require('../components/not-found.vue'))}
        ]
    });

    // var CACHED_DB;  // TODO cached DB variable, the WHOLE database, use query later?

    var vue = new Vue({
        router,
        created: function() {
            this.$router.push('');
        }
    }).$mount('#app');

}); // end of jquery ready document