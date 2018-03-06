<template>
    <div class="col-sm-12 row query-result">

        <div class="col-sm-2 query-id">
            <h5 @click="showMedia()" :class="[{queryIdMedia: isAudio || isImage }]">{{ index + 1 }}</h5>
        </div>

        <div class="col-sm-10 query-entry">
            <h6><a :href="data.url" target="_blank">{{ data.callTypeName }}</a></h6>
            <p><b>Contributor: </b>{{ data.pi }}, {{ data.firstName }}</p>
            <p>{{ data.date }} - {{ data.time }}</p>
            <p>{{ data.groundType }} - {{ data.regionCountry }} - {{ data.region }}</p>
            <p>{{ data.sensorType }} - {{ data.sensorName }} - {{ data.samplingRate }}Hz - {{ data.quality }} - {{
                getfileType }}/{{ data.dataFormat
                }}</p>

            <div v-if="isShowing && isAudio">
                <audio controls>
                    <source :src="data.url">
                </audio>
            </div>

            <div v-if="isShowing && isImage">
                <img :src="data.url">
            </div>


            <hr>
        </div>
    </div>
</template>

<script>
    // noinspection JSAnnotator
    export default {
        name: "q-entry",
        props: ["data", "index"],
        data: function () {
            return {
                isShowing: false,
                isAudio: false,
                isImage: false
            }
        },
        computed: {
            getfileType: function () {
                switch (this.data.dataType) {
                    case 'i':
                        this.isImage = true;
                        return "image";
                    case 'a':
                        this.isAudio = true;
                        return "audio";
                    case 's':
                        return "source";
                    default:
                        return "other"
                }
            }
        },
        methods: {
            showMedia: function () {
                this.isShowing = !this.isShowing;
            }
        }
    }
</script>

<style scoped>

</style>