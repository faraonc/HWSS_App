<template>
    <div class="col-sm-12 row query-result">

        <div class="col-sm-2 query-id">
            <h5>{{ index + 1 }}</h5>
        </div>

        <div class="col-sm-10 query-entry">
            <h6 @click="showMedia()">{{ item.callTypeName }}</h6>
            <p><b>Publisher: </b>{{ item.pi }}, {{ item.firstName }}</p>
            <p>{{ convertDate }}</p>
            <p>{{ qEntryNormalize(item.groundType) }} - {{ qEntryNormalize(item.regionCountry) }} - {{ item.region
                }}</p>
            <p>{{ item.sensorType }} - {{ item.sensorName }} - {{ item.samplingRate }}Hz - Q{{ item.quality }} - {{
                extractMedia }}</p>

            <div v-if="isShowing">
                <q-audio v-for="audio in item.audio_url" :audio="audio"></q-audio>
                <q-image v-for="image in item.image_url" :image="image"></q-image>
            </div>


            <hr>
        </div>
    </div>
</template>

<script>
    Vue.component('q-audio', require('./q-audio.vue'));
    Vue.component('q-image', require('./q-image.vue'));

    // noinspection JSAnnotator
    export default {
        name: "q-entry",
        props: ["item", "index"],
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
                this.isShowing = !this.isShowing;
            },
            qEntryNormalize: function (string) {
                return string.replace(/([A-Z])/g, ' $1');
            }
        }
    }
</script>

<style scoped>

</style>