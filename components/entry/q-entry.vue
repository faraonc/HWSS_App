<template>
    <div class="query-entry-wrapper">
    <div class="col-sm-12 row query-result" @click="showMedia()">

        <div class="col-sm-2 query-id">
            <h5>{{ start + index + 1 }}</h5>
        </div>

        <div class="col-sm-10 query-entry">
            <h6>{{ item.callTypeName }}</h6>
            <p><b>Publisher: </b>{{ item.pi }}, {{ item.firstName }}</p>
            <p>{{ convertDate }}</p>
            <p>{{ qEntryNormalize(item.regionCountry) }} - {{ item.region}}</p>
            <p>{{ qEntryNormalize(item.groundType) }} - {{ item.sensorType }} - {{ item.sensorName }}</p>
            <p>{{ item.samplingRate }}Hz - Q{{ item.quality }} - {{extractMedia }}</p>

            <div v-if="isShowing" class="query-entry-media">
                <q-file v-for="(file, index) in item.file_url" :file="file" :index="index"></q-file>
                <q-audio v-for="audio in item.audio_url" :audio="audio"></q-audio>
                <q-image v-for="image in item.image_url" :image="image"></q-image>
                <!--TODO FILES and VIDEOS-->
            </div>
        </div>
    </div>
        <hr>
    </div>
</template>

<script>
    Vue.component('q-audio', require('./q-audio.vue'));
    Vue.component('q-image', require('./q-image.vue'));
    Vue.component('q-file', require('./q-file.vue'))
    // noinspection JSAnnotator
    export default {
        name: "q-entry",
        props: ["item", "index", "start", "markers"],
        data: function () {
            return {
                isShowing: false,
                hasMedia: false
            }
        },
        computed: {
            extractMedia: function () {
                var media = [];
                if (this.item.audio_url.length > 0) {
                    this.hasMedia = true;
                    media.push("audio");
                }

                if (this.item.video_url.length > 0) {
                    this.hasMedia = true;
                    media.push("video");
                }

                if (this.item.image_url.length > 0) {
                    this.hasMedia = true;
                    media.push("image");
                }

                if (this.item.file_url.length > 0) {
                    this.hasMedia = true;
                    media.push("file");
                }

                return media.join("/")

            },
            convertDate: function () {
                var y = this.item.date / 10000,
                    m = this.item.date % 10000 / 100,
                    d = this.item.date % 100,
                    h = this.item.time / 10000,
                    n = this.item.time % 10000 / 100,
                    s = this.item.time % 100;

                return new Date(y, m, d, h, n, s).toUTCString();
            }
        },
        methods: {
            showMedia: function () {
                this.goToMarker();
                this.isShowing = !this.isShowing;

            },
            qEntryNormalize: function (string) {
                return string.replace(/([A-Z])/g, ' $1');
            },
            goToMarker: function () {
                if(!this.isShowing) {
                    google.maps.event.trigger(this.markers[this.index], 'center');
                    google.maps.event.trigger(this.markers[this.index], 'click');
                }
            }
        },
        watch: {
            item: function(){
                if(this.isShowing) {
                    this.isShowing = false;
                }
            }
        }
    }
</script>

<style scoped>

</style>