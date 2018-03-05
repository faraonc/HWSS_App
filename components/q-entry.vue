<template>
    <div class="col-sm-12 row query-result">

        <div class="col-sm-2 query-id">
            <h5>{{ index + 1 }}</h5>
        </div>

        <div class="col-sm-10 query-entry">
            <a href="#"><h6>{{ data.callTypeName }}</h6></a>
            <p><b>Contributor: </b>{{ data.pi }}, {{ data.firstName }}</p>
            <p>{{ data.date }} - {{ data.time }}</p>
            <p>{{ data.groundType }}, {{ data.regionCountry }}, {{ data.region }}</p>
            <p>{{ data.sensorType }}, {{ data.sensorName }}, {{ data.samplingRate }}, {{ data.quality }}, {{ data.dataType }}/{{ data.dataFormat
                }}</p>

            <hr>
        </div>
    </div>
</template>

<script>
    // noinspection JSAnnotator
    export default {
        name: "q-entry",
        props: ["data", "index"]
    }
</script>

<style scoped>

</style>