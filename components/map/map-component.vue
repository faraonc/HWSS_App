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
                queryData: []
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
                    },
                    error: function () {
                        alert("Unable to read data from: " + "query/metadata?all");
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>