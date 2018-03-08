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

                        <div class="col-sm-4">
                            <button class="btn btn-secondary" type="button" aria-haspopup="true"
                                    aria-expanded="false" @click="makeQuery()">
                                Sort By
                            </button>
                        </div>

                        <div class="col-sm-4">
                            <button class="btn btn-secondary" type="button" aria-haspopup="true"
                                    aria-expanded="false">
                                Previous
                            </button>
                        </div>

                        <div class="col-sm-4">
                            <button class="btn btn-secondary" type="button" aria-haspopup="true"
                                    aria-expanded="false" @click="nextSet()">
                                Next
                            </button>
                        </div>
                    </div>

                    <hr>
                    <!--Query Results-->
                    <div id="query-container" class="row text-center">

                        <!--Query Entries-->
                        <q-entry v-for="(query, index) in currSet" :item="query" :index="index" :start="startIndex" :end="endIndex"
                                 :markers="markers"></q-entry>


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
    export const NUM_DISPLAY = 10; //number of entries to display in the map's side bar
    // noinspection JSAnnotator
    export default {
        //TODO enclose component with ID #map-container
        name: "map-component",
        prop: ['queries'],
        data: function () {
            return {
                map: null,
                navState: true,
                descState: false,
                markerPlaced: false,
                queryData: [],
                markers: [],
                currSet: [],
                startIndex: 0,
                endIndex: NUM_DISPLAY
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
            //zooming range for google map
            this.map.setOptions({minZoom: 3, maxZoom: 15});

        },
        methods: {
            toggleMenu: function () {
                this.navState = !this.navState;
            },
            makeQuery: function (event) {
                //TODO find a marker
                var self = this;
                console.log("made it: ", this.$route.params.queries);

                $.ajax({
                    dataType: "json",
                    url: "query/metadata?all",
                    timeout: 10000,
                    success: function (response) {
                        self.queryData.push.apply(self.queryData, response.result);
                        if(self.queryData.length < NUM_DISPLAY){
                            self.endIndex = self.queryData.length;
                        }

                        for(var i = 0; i < self.endIndex; i++){
                            self.currSet.push(self.queryData[i])
                        }

                        //check if any markers in the map
                        if (self.markerPlaced) {
                            self.removeMarkers();
                        }
                        self.createInfoMarker();
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
                for (var i = 0; i < this.currSet.length; i++) {
                    var y = this.currSet[i].date / 10000,
                        m = this.currSet[i].date % 10000 / 100,
                        d = this.currSet[i].date % 100,
                        h = this.currSet[i].time / 10000,
                        n = this.currSet[i].time % 10000 / 100,
                        s = this.currSet[i].time % 100;
                    var date = new Date(y, m, d, h, n, s).toUTCString();

                    var mapNormalize = function (string) {
                        return string.replace(/([A-Z])/g, ' $1');
                    };

                    var contentString = [
                        '<div class="col-sm-12 row query-result container"><div class="col-sm-2 query-id"><h5>',
                        (this.startIndex + i + 1),
                        '</h5></div><div class="col-sm-10 query-entry"><h6>',
                        this.currSet[i].callTypeName,
                        '</h6><p>',
                        this.currSet[i].pi,
                        ', ',
                        this.currSet[i].firstName,
                        '</p><p>',
                        date,
                        '</p><p>',
                        mapNormalize(this.currSet[i].groundType),
                        ' - ',
                        mapNormalize(this.currSet[i].regionCountry),
                        '</p><hr></div>'
                    ];

                    //TODO re-arrange
                    if (this.currSet[i].dataType === 'a') {
                        contentString.push('<audio controls><source src="' + this.currSet[i].url + '"></audio>');
                    } else if (this.currSet[i].dataType === 'i') {
                        contentString.push('<img src="' + this.currSet[i].url + '">');
                    }

                    contentString.push('</div>');

                    this.placeMarkers(this.currSet[i].lat, this.currSet[i].long, infowindow, contentString.join(''));

                }
                // google.maps.event.addDomListener(window, 'load', this.mapOptions);
                this.markerPlaced = true;

            },
            placeMarkers: function (lat, long, infowindow, contentString) {

                var self = this;
                var marker = new google.maps.Marker({
                    position: {lat: lat, lng: long},
                    map: self.map,
                    animation: google.maps.Animation.DROP
                });

                marker.addListener('click', function () {
                    infowindow.close(); // Close previously opened infowindow
                    infowindow.setContent("<div id='infowindow'>" + contentString + "</div>");
                    infowindow.open(self.map, marker);
                });

                google.maps.event.addListener(self.map, 'click', function () {
                    infowindow.close(self.map, marker);
                });

                marker.addListener('center', function () {
                    self.map.setCenter(this.getPosition());
                });

                this.markers.push(marker);
            },
            removeMarkers: function () {
                for (var i = this.startIndex; i < this.endIndex; i++) {
                    this.markers[i].setMap(null);
                }
                while(this.markers.length > 0) {
                    this.markers.pop();
                }
                this.markerPlaced = false;
            },
            nextSet: function(){
                if (this.markerPlaced) {
                    this.removeMarkers();
                }
                this.startIndex = this.endIndex;
                if(this.queryData.length - this.endIndex < NUM_DISPLAY){
                    this.endIndex = this.queryData.length;
                }else {
                    this.endIndex += NUM_DISPLAY;
                }
                while(this.currSet.length > 0) {
                    this.currSet.pop();
                }

                for(var i = this.startIndex; i < this.endIndex; i++){
                    this.currSet.push(this.queryData[i]);
                }
                console.log(this.currSet);
                this.createInfoMarker();


            }
        }
    }
</script>

<style scoped>

</style>