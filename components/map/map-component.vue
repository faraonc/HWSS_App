<template>
    <div id="map-container" class="container">

        <!--Do not change showNav to show-nav, VueJS has a bug.-->
        <div id="site-wrapper" :class="{ showNav: navState}">

            <div id="site-canvas">

                <!--Off Canvas Menu-->
                <div id="site-menu">
                    <div class="col-sm-12">
                        <h5>Humpback Whale Social Sound</h5>
                    </div>
                    <div class="row text-center map-nav-btns">
                        <div class="col-sm-7 map-search-sort">
                            <a href="/" class="btn btn-secondary" role="button" @click="goSearch()">
                                Search
                            </a>

                            <div class="multi-select-dropdown btn-group">
                                <sort-by :list="queryData" :sort="isSorting" :disableSort="sortDisable"></sort-by>
                            </div>
                        </div>

                        <div class="col-sm-5 map-next-prev-btns">
                            <button class="btn btn-secondary" :class="[{disabled: !isPrevEnabled}]"
                                    :disabled="!isPrevEnabled" type="button" @click="prevSet()">
                                Prev
                            </button>
                            <button class="btn btn-secondary" :class="[{disabled: !isNextEnabled}]"
                                    :disabled="!isNextEnabled" type="button" @click="nextSet()">
                                Next
                            </button>
                        </div>
                    </div>
                    <hr>
                    <div class="loading-image" v-show="loading === true">
                        <img class="center-block" src="/public/loading.gif" width="200">

                    </div>
                    <p v-if="!hasData" class="no-match-err">Your search did not match any documents.</p>
                    <!--Query Results-->
                    <div id="query-container">


                        <!--Query Entries-->
                        <q-entry v-for="(query, index) in currSet" :item="query" :index="index" :start="startIndex"
                                 :markers="markers"></q-entry>

                    </div>

                </div>
                <!--End Off Canvas Menu-->

                <!--Button for Off Canvas Menu-->
                <div class="navbar-header">
                    <a href="#/map" class="toggle-nav btn btn-md btn-secondary" v-on:click="toggleMenu()">&#9776;</a>
                </div>
                <!--End Button for Off Canvas Menu-->

                <div id="map-canvas"></div>
                <div id="latlondiv">
                    lon: {{lat}}
                    <br>lat: {{lng}}
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    Vue.component('q-entry', require('../entry/q-entry.vue'));
    Vue.component('sort-by', require('./sort-by.vue'));

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
                isNextEnabled: false,
                isPrevEnabled: false,
                sortDisable: false,
                hasData: true,
                loading: false,
                isSorting: [],
                queryData: [],
                markers: [],
                currSet: [],
                lat: 0,
                lng: 0,
                startIndex: 0,
                endIndex: NUM_DISPLAY,
                Q: "query/metadata?all"
            }
        },
        mounted: function () {

            if (this.$route.params.queries) {
                this.Q = this.$route.params.queries
            }
            var latLng = new google.maps.LatLng(47.6062, -122.3321);
            var mapOptions = {
                zoom: 4,
                center: latLng,
                mapTypeId: google.maps.MapTypeId.HYBRID,


                // disables the yellow man
                panControl: false,
                streetViewControl: false,

                // disables other types of MAP, forces to only use Satellite view
                mapTypeControlOptions: {mapTypeIds: []},
                styles: [
                    {
                        featureType: "road",
                        stylers: [
                            {visibility: "off"}
                        ]
                    },
                    {
                        featureType: "administrative",
                        elementType: "labels",
                        stylers: [
                            {visibility: "off"}
                        ]
                    },
                    {
                        featureType: "administrative.country",
                        elementType: "labels",
                        stylers: [
                            {visibility: "on"}
                        ]
                    },
                    {
                        featureType: "poi",
                        elementType: "labels",
                        stylers: [
                            {visibility: "off"}
                        ]
                    }
                ]

            };
            this.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
            //zooming range for google map
            this.map.setOptions({minZoom: 3, maxZoom: 15});
            this.makeQuery();

            var self = this;
            google.maps.event.addListener(this.map, 'mousemove', function (event) {
                self.lat = event.latLng.lat();
                self.lng = event.latLng.lng();
            });
        },
        methods: {
            toggleMenu: function () {
                this.navState = !this.navState;
            },
            makeQuery: function (event) {
                var self = this;
                this.loading = true;
                $.ajax({
                    dataType: "json",
                    url: self.Q,
                    timeout: 10000,
                    success: function (response) {
                        if (response.result.length && response.result.length > 0) {
                            self.queryData.push.apply(self.queryData, response.result);
                            if (self.queryData.length <= NUM_DISPLAY) {
                                self.endIndex = self.queryData.length;
                            } else {
                                self.isNextEnabled = true;
                            }

                            for (var i = 0; i < self.endIndex; i++) {
                                self.currSet.push(self.queryData[i])
                            }

                            //check if any markers in the map
                            if (self.markerPlaced) {
                                self.removeMarkers();
                            }
                            self.createInfoMarker();
                            self.loading = false;
                            self.hasData = true;
                        } else {
                            self.hasData = false;
                            self.loading = false;
                            self.sortDisable = true;
                        }
                    },
                    error: function () {
                        self.hasData = false;
                        self.loading = false;
                        self.sortDisable = true;
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
                        '<div class="row container info-marker"><div class="col-sm-1 info-marker-h"><h5>',
                        (this.startIndex + i + 1),
                        '</h5></div><div class="col-sm-11"><h6>',
                        this.currSet[i].callTypeName,
                        '</h6><p>',
                        this.currSet[i].pi,
                        ', ',
                        this.currSet[i].firstName,
                        '</p><p>',
                        date,
                        '</p><p>',
                        mapNormalize(this.currSet[i].regionCountry),
                        '</p><p>',
                        mapNormalize(this.currSet[i].groundType),
                        '</p></div></div><hr class="info-break">'
                    ];

                    for (var j = 0; j < this.currSet[i].file_url.length; j++) {
                        contentString.push('<div class="info-file"><a href="');
                        contentString.push(this.currSet[i].file_url[j]);
                        contentString.push('" target="_blank">mat_');
                        contentString.push(j + 1);
                        contentString.push('</a></div>');
                    }

                    contentString.push('<div class="info-media">');
                    for (var j = 0; j < this.currSet[i].audio_url.length; j++) {
                        contentString.push('<div><audio controls><source src="' + this.currSet[i].audio_url[j] + '"></audio></div>');
                    }

                    for (var j = 0; j < this.currSet[i].image_url.length; j++) {
                        contentString.push('<div class="info-img"><img src="' + this.currSet[i].image_url[j] + '"></div>');
                    }

                    contentString.push('</div>');


                    this.placeMarkers(this.currSet[i].lat, this.currSet[i].long, infowindow, contentString.join(''));

                }
                // google.maps.event.addDomListener(window, 'load', this.mapOptions);
                this.markerPlaced = true;

            },
            placeMarkers: function (lat, long, infowindow, contentString) {

                var self = this;

                var icon = {
                    url: 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi.png', // url
                    scaledSize: new google.maps.Size(20, 28), // scaled size
                    origin: new google.maps.Point(0, 0), // origin
                    anchor: new google.maps.Point(0, 0) // anchor
                };

                var marker = new google.maps.Marker({
                    position: {lat: lat, lng: long},
                    map: self.map,
                    animation: google.maps.Animation.DROP,
                    icon: icon
                });

                var toggleBounce = function () {
                    if (marker.getAnimation() != null) {
                        marker.setAnimation(null);
                    } else {
                        marker.setAnimation(google.maps.Animation.BOUNCE);
                    }
                }

                marker.addListener('click', function () {
                    infowindow.close(); // Close previously opened infowindow
                    infowindow.setContent("<div id='infowindow'>" + contentString + "</div>");
                    toggleBounce();
                    infowindow.open(self.map, marker);
                    setTimeout(toggleBounce, 1500);
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
                for (var i = 0; i < this.markers.length; i++) {
                    this.markers[i].setMap(null);
                }
                while (this.markers.length > 0) {
                    this.markers.pop();
                }
                this.markerPlaced = false;
            },
            nextSet: function () {
                if (this.isNextEnabled) {
                    if (this.markerPlaced) {
                        this.removeMarkers();
                    }
                    this.startIndex = this.endIndex;
                    if (this.queryData.length - this.endIndex < NUM_DISPLAY) {
                        this.endIndex = this.queryData.length;
                        this.isNextEnabled = false;
                    } else {
                        this.endIndex += NUM_DISPLAY;
                    }
                    while (this.currSet.length > 0) {
                        this.currSet.pop();
                    }

                    for (var i = this.startIndex; i < this.endIndex; i++) {
                        this.currSet.push(this.queryData[i]);
                    }

                    this.createInfoMarker();
                    this.isPrevEnabled = true;
                }
            },
            prevSet: function () {
                if (this.isPrevEnabled) {
                    if (this.markerPlaced) {
                        this.removeMarkers();
                    }

                    this.endIndex = this.endIndex - (this.endIndex - this.startIndex);
                    this.startIndex -= NUM_DISPLAY;

                    if (this.startIndex <= 0) {
                        this.isPrevEnabled = false;
                    }
                    while (this.currSet.length > 0) {
                        this.currSet.pop();
                    }
                    for (var i = this.startIndex; i < this.endIndex; i++) {
                        this.currSet.push(this.queryData[i]);
                    }

                    this.createInfoMarker();
                    this.isNextEnabled = true;
                }
            },
            goSearch: function () {
                this.map = null;
                this.navState = true;
                this.descState = false;
                this.markerPlaced = false;
                this.isNextEnabled = false;
                this.isPrevEnabled = false;

                while (this.queryData.length > 0) {
                    this.queryData.pop();
                }

                while (this.markers.length > 0) {
                    this.markers.pop();
                }

                while (this.currSet.length > 0) {
                    this.currSet.pop();
                }

                this.startIndex = 0;
                this.endIndex = NUM_DISPLAY;
                this.Q = "query/metadata?all";
            },

        },
        watch: {
            isSorting: function () {

                if (this.isSorting.length > 0) {
                    this.loading = true;
                    this.startIndex = 0;
                    this.endIndex = NUM_DISPLAY;
                    this.removeMarkers();

                    while (this.currSet.length > 0) {
                        this.currSet.pop();
                    }
                    if (this.queryData.length <= NUM_DISPLAY) {
                        this.endIndex = this.queryData.length;
                    } else {
                        this.isNextEnabled = true;
                    }

                    for (var i = 0; i < this.endIndex; i++) {
                        this.currSet.push(this.queryData[i])
                    }

                    //check if any markers in the map
                    if (this.markerPlaced) {
                        this.removeMarkers();
                    }
                    this.createInfoMarker();

                    this.isSorting.pop();

                    this.loading = false;
                }
            },
        }
    }
</script>

<style scoped>
    html, body {
        height: 100%;
        margin: 0;
        padding: 0;
    }

    .container {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
    }

    #map-container {
        height: 100%;
    }

    #map-canvas {
        height: 100%;
        z-index: -1;
        top: -40px;
    }

    .no-match-err {
        display: inline-block;
        margin: 30px auto 0 auto;
        text-align: center;
        width: 450px;

    }

    /*Container for the body.*/
    #site-canvas {
        width: 100%;
        height: 100.38%;
        position: relative;
        /*Do no touch duplicates*/
        -moz-transform: translateX(0);
        -moz-transform: translate3d(0, 0, 0);
        -webkit-transform: translateX(0);
        -webkit-transform: translate3d(0, 0, 0);
        transform: translateX(0);
        transform: translate3d(0, 0, 0);
        transition: 300ms ease all;
        backface-visibility: hidden;
    }

    /*Do not change showNav to show-nav, VueJS has a bug.*/
    .showNav #site-canvas {
        /*Do no touch duplicates*/
        -moz-transform: translateX(500px);
        -moz-transform: translate3d(500px, 0, 0);
        -webkit-transform: translateX(500px);
        -webkit-transform: translate3d(500px, 0, 0);
        transform: translateX(500px);
        transform: translate3d(500px, 0, 0);
    }

    #site-wrapper {
        height: 100%;
        position: relative;
        overflow-x: hidden;
        overflow-y: hidden;
    }

    /*#site-menu {*/
        /*width: 500px;*/
        /*height: 100%;*/
        /*position: absolute;*/
        /*top: 0;*/
        /*left: -500px;*/
        /*background: #FFF;*/
        /*padding: 15px;*/
    /*}*/

    /*!*Styles for contents of the off-canvas menu.*!*/
    /*#site-menu > div:first-child > div:first-child > p:first-child {*/
        /*text-decoration: none;*/
        /*font-size: 20px;*/
        /*color: #2a6d4c;*/
        /*display: block;*/
        /*transition: 0.5s;*/
    /*}*/
</style>