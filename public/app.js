$(document).ready(function () {

    Vue.component('map-component', require('../components/map/map-component.vue'));
    new Vue({
        el: "#map-container",
        data: {}

    });
});