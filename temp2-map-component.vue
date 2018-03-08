<template>
    <div id="map-container" class="container">

        <!--Do not change showNav to show-nav, VueJS has a bug.-->
        <div id="site-wrapper" :class="{ showNav: navState}">

            <div id="site-canvas">

                <!--Off Canvas Menu-->
                <div id="site-menu">
                    <div class="row text-center">
                        <div class="col-sm-12">
                            <p>Humpback Whale Social Sound</p>
                        </div>

                        <div class="col-sm-6">
                            <button class="btn btn-secondary" type="button" aria-haspopup="true"
                                    aria-expanded="false">
                                Edit Category
                            </button>
                        </div>
                        <div class="col-sm-6">
                            <button class="btn btn-secondary" type="button" aria-haspopup="true"
                                    aria-expanded="false" @click="makeQuery()">
                                Sort By
                            </button>
                        </div>
                    </div>

                    <hr>
                    <!--Query Results-->
                    <div id="query-container" class="row text-center">

                        <!--Query Entries-->
                        <q-entry v-for="(query, index) in queryData" :item="query" :index="index"></q-entry>


                    </div>

                </div>
                <!--End Off Canvas Menu-->

                <!--Button for Off Canvas Menu-->
                <div class="navbar-header">
                    <a href="#" class="toggle-nav btn btn-md btn-secondary" v-on:click="toggleMenu()">&#9776;</a>
                </div>
                <!--End Button for Off Canvas Menu-->

                <div id="map-canvas"></div>

            </div>

        </div>

    </div>
</template>

<script>
    Vue.component('q-entry', require('../entry/q-entry.vue'));

    // noinspection JSAnnotator
    export default {
        //TODO enclose component with ID #map-container
        name: "map-component",
        data: function () {
            return {
                map: null,
                navState: true,
                descState: false,
                markerPlaced: false,
                queryData: [],
                markers: []
            }
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
            this.map.setOptions({minZoom: 3, maxZoom: 15});
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
                    timeout: 10000,
                    success: function (response) {
                        self.queryData.push.apply(self.queryData, response.result);
                        if (self.markerPlaced) {
                            self.removeMarkers();
                        }
                        self.createInfoMarker();
                        self.markerPlaced = true;
                    },
                    error: function () {
                        alert("Unable to read data from: " + "query/metadata?all");
                    }
                });
            },
            createInfoMarker: function () {
                var infowindow = new google.maps.InfoWindow({
                    content: ''
                });
                for (var i = 0; i < this.queryData.length; i++) {

                    var mapInstance = this.map;

                    /*can I call q-entry???*/
                    var y = this.queryData[i].date / 10000,
                        m = this.queryData[i].date % 10000 / 100,
                        d = this.queryData[i].date % 100,
                        h = this.queryData[i].time / 10000,
                        n = this.queryData[i].time % 10000 / 100,
                        s = this.queryData[i].time % 100;
                    //console.log(y, m, d, h, n, s);
                    var date = new Date(y, m, d, h, n, s).toUTCString();


                    var contentString = "<div class=\"col-sm-2 query-id\">\n" +
                        "            <h5 @click=\"showMedia()\" :class=\"[{queryIdMedia: isAudio || isImage }]\">" + i + 1 + "</h5>\n" +
                        "        </div>\n" +
                        "        <div class=\"col-sm-10 query-entry\">\n" +
                        "            <h6><a :href=\"data.url\" target=\"_blank\">" + this.queryData[i].callTypeName + "</a></h6>\n" +
                        "            <p><b>Contributor: </b>" + "</p>\n" +
                        "            <p>" + this.queryData[i].pi + "," + this.queryData[i].firstName + " </p>\n" +
                        "            <p>" + date + "</p>\n" +
                        "            <p>" + this.replaceSpace(this.queryData[i].groundType)+ " - " + this.replaceSpace(this.queryData[i].regionCountry) + "</p>\n" +
                        "            <p>" + this.queryData[i].region + "</p>\n" +
                        "            <p>" + this.queryData[i].sensorType + " - " + this.queryData[i].sensorName + " - " + this.queryData[i].samplingRate + "Hz - " +
                        this.queryData[i].quality + this.queryData[i].dataFormat + "</p>" +
                        "\n" +
                        "            <div v-if=\"isShowing && isAudio\">\n" +
                        "                <audio controls>\n" +
                        "                    <source :src=" + this.queryData[i].url + ">\n" +
                        "                </audio>\n" +
                        "            </div>\n" +
                        "            <div v-if=\"isShowing && isImage\">\n" +
                        "                <img :src=" + this.queryData[i].url + ">\n" +
                        "            </div>\n" +
                        "            <hr>\n" +
                        "        </div>";


                    this.placeMarkers(this.queryData[i], mapInstance, infowindow, contentString);

                }
                google.maps.event.addDomListener(window, 'load', this.mapOptions);

            },
            placeMarkers: function (queryData, mapInstance, infowindow, contentString) {

                var marker = new google.maps.Marker({
                    position: {lat: queryData.lat, lng: queryData.long},
                    map: mapInstance,
                    animation: google.maps.Animation.DROP
                });

                marker.addListener('click', function () {
                    infowindow.close(); // Close previously opened infowindow
                    infowindow.setContent("<div id='infowindow'>" + contentString + "</div>");
                    infowindow.open(mapInstance, marker);
                });
                google.maps.event.addListener(mapInstance, 'click', function(){
                    infowindow.close(mapInstance, marker);
                });
                this.markers.push(marker);
            },
            removeMarkers: function () {
                for (var i = 0; i < this.markers.length; i++) {
                    this.markers[i].setMap(null);
                }
                this.markers = [];
                this.markerPlaced = false;
            },
            replaceSpace: function(string){
                return string.replace(/([A-Z])/g, ' $1');
            }
        }
    }
</script>

<style scoped>

</style>