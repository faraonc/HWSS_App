<template>
    <div class="col-sm-12 row query-result">

        <div class="col-sm-2 query-id">
            <h5>{{ index + 1 }}</h5>
        </div>

        <div class="col-sm-10 query-entry">
            <h6><a href="#">{{ data.callTypeName }}</a></h6>
            <p><b>Contributor: </b>{{ data.pi }}, {{ data.firstName }}</p>
            <p>{{ data.date }} - {{ data.time }}</p>
            <p>{{ data.groundType }} - {{ data.regionCountry }} - {{ data.region }}</p>
            <p>{{ data.sensorType }} - {{ data.sensorName }} - {{ data.samplingRate }}Hz - {{ data.quality }} - {{
                getfileType }}/{{ data.dataFormat
                }}</p>
            <hr>
        </div>
    </div>
</template>

<script>
    // noinspection JSAnnotator
    export default {
        name: "q-entry",
        props: ["data", "index"],
        computed: {
            getfileType: function () {
                switch (this.data.dataType) {
                    case 'i':
                        return "image";
                    case 'a':
                        return "audio";
                    case 's':
                        return "source";
                    default:
                        return "other"
                }

            }
        }
    }
</script>

<style scoped>

</style>