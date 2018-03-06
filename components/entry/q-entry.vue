<template>
    <div class="col-sm-12 row query-result">

        <div class="col-sm-2 query-id">
            <h5 @click="showMedia()" :class="[{queryIdMedia: isAudio || isImage }]">{{ index + 1 }}</h5>
        </div>

        <div class="col-sm-10 query-entry">
            <h6><a :href="item.url" target="_blank">{{ item.callTypeName }}</a></h6>
            <p><b>Publisher: </b>{{ item.pi }}, {{ item.firstName }}</p>
            <p>{{ convertDate }} - {{ convertTime }}</p>
            <p>{{ item.groundType }} - {{ item.regionCountry }} - {{ item.region }}</p>
            <p>{{ item.sensorType }} - {{ item.sensorName }} - {{ item.samplingRate }}Hz - Q{{ item.quality }} - {{
                getfileType }}/{{ item.dataFormat
                }}</p>

            <div v-if="isShowing && isAudio">
                <audio controls>
                    <source :src="item.url">
                </audio>
            </div>

            <div v-if="isShowing && isImage">
                <img :src="item.url">
            </div>


            <hr>
        </div>
    </div>
</template>

<script>
    // noinspection JSAnnotator
    export default {
        name: "q-entry",
        props: ["item", "index"],
        data: function () {
            return {
                isShowing: false,
                isAudio: false,
                isImage: false
            }
        },
        computed: {
            getfileType: function () {
                switch (this.item.dataType) {
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
            },
            convertDate: function () {
                var year = this.item.date.toString().substring(0, 4);
                var month = this.item.date.toString().substring(4, 6);
                var day = this.item.date.toString().substring(6, 8);
                return new Date(year, month - 1, day).toDateString();
            },
            convertTime: function(){
                var time = [];
                time.push(this.item.time.toString().substring(0,2));
                time.push(this.item.time.toString().substring(2,4));
                time.push(this.item.time.toString().substring(4,6));
                return time.join(":")
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