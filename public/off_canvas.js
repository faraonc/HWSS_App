$(document).ready(function () {

    new Vue({
        el: "#map-container",
        data: {
            map: null,
            navState: false
        },
        mounted: function () {
            var latLng = new google.maps.LatLng(47.6062, -122.3321);
            var mapOptions = {
                zoom: 3,
                center: latLng,
                mapTypeId: google.maps.MapTypeId.SATELLITE,

                // disables the yellow man
                panControl: false,
                streetViewControl: false,

                // disables other types of MAP, forces to only use Satellite view
                mapTypeControlOptions: {mapTypeIds: []}

            };
            this.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        },
        methods: {
            toggleNav: function () {
                var vm = this;
                if (this.navState){
                    var vm = this;
                    vm.$refs.mySideNav.style.width = "0px";
                    vm.$refs.main.style.marginLeft = "0px";
                }else{
                    vm.$refs.mySideNav.style.width = "500px";
                    vm.$refs.main.style.marginLeft = "500px";
                }
                this.navState = !this.navState;
            }
        }

    });
});