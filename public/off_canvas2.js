$(document).ready(function () {

    Vue.component('q-entry', require('../components/q-entry.vue'));

    new Vue({
        el: "#map-container",
        data: {
            map: null,
            navState: true,
            descState: false,
            queryData: []
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
            toggleMenu: function () {
                this.navState = !this.navState;
            },
            makeQuery: function (event) {
                var self = this;
                $.ajax({
                    dataType: "json",
                    url: "query/metadata?all",
                    timeout: 5000,
                    success: function (response) {
                        console.log(response);
                        self.queryData.push.apply(self.queryData, response.result);
                    },
                    error: function () {
                        alert("Unable to read data from: " + "query/metadata?all");
                    }
                });
            }
        }

    });
});


// [{
//     index: 1,
//     callTypeName: "Conga",
//     pi: "Seger",
//     firstName: "Kerri",
//     date: 20140313,
//     time: 112313,
//     groundType: "BreedingMigrating",
//     regionCountry: "CaboMexico",
//     region: "Pacific Ocean",
//     sensorType: "Tag",
//     sensorName: "Acousonde",
//     samplingRate: 8000,
//     quality: 3,
//     dataType: "audio",
//     dataFormat: "wav"
// }, {
//     index: 2,
//     callTypeName: "Wookie",
//     pi: "Ghadimi",
//     firstName: "Pouria",
//     date: 20140313,
//     time: 112313,
//     groundType: "UberMigrating",
//     regionCountry: "CaboMexico",
//     region: "Pacific Ocean",
//     sensorType: "Tag",
//     sensorName: "Acousonde",
//     samplingRate: 8000,
//     quality: 3,
//     dataType: "audio",
//     dataFormat: "wav"
// }]