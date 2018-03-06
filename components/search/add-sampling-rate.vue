<template>
    <span>
        <div class="form-control-wrapper">
            <input type="text" class="form-control" v-model="search" placeholder="Search">
        </div>
        <label v-for="samplingRate in filteredSamplingRates">
            <li class="dropdown-item" >
                <input type="checkbox" v-on:click="checkedSamplingRate(samplingRate)">{{samplingRate}}
            </li>
        </label>
    </span>
</template>

<script>
    export default {
        name: "add-sampling-rate",
        data: function() {
            return {
                search: '',
                selectedSamplingRates: new Set()
            }
        },
        computed: {
            filteredSamplingRates: function() {
                return _.sortBy(this.$root.samplingRates).filter(rates => rates.toString().includes(this.search))
            }
        },
        methods: {
            checkedSamplingRate: function(samplingRate) {
                this.$root.processSelected("samplingRates", this.selectedSamplingRates, samplingRate);
            }
        }
    }
</script>

<style scoped>

</style>