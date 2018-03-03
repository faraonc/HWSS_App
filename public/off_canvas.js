$(document).ready(function () {

    new Vue({
        el: "#map-container",
        data: {
            map: null,
            navState: true
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

            // open the menu by default
            //TODO transition of texts inside
            this.$refs.mySideNav.style.width = "500px";
            this.$refs.main.style.marginLeft = "500px";

        },
        methods: {
            toggleNav: function () {
                if (this.navState){
                    this.$refs.mySideNav.style.width = "0px";
                    this.$refs.main.style.marginLeft = "0px";
                }else{
                    this.$refs.mySideNav.style.width = "500px";
                    this.$refs.main.style.marginLeft = "500px";
                }
                this.navState = !this.navState;
            }
        }

    });
});