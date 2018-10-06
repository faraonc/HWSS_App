<template>
    <span>
        <div class="form-control-wrapper">
            <input type="text" class="form-control" v-model="search" placeholder="Search">
        </div>
        <label v-for="samplingRate in filteredSamplingRates">
            <li class="dropdown-item" >
                <input type="checkbox" @click="processSelection(samplingRate)">{{samplingRate}}
            </li>
        </label>
    </span>
</template>

<script>
    export default {
        name: "add-sampling-rate",
        props: ['itemList'],
        data: function() {
            return {
                search: '',
                selectedSamplingRates: new Set()
            }
        },
        computed: {
            filteredSamplingRates: function() {
                return _.sortBy(this.itemList).filter(rates => rates.toString().includes(this.search))
            }
        },
        methods: {
            processSelection: function(samplingRate) {
                this.$emit('checkedItem', "samplingRate", this.selectedSamplingRates, samplingRate)
            }
        }
    }
</script>

<style scoped>
    .form-control-wrapper {
        position: sticky;
        position: -webkit-sticky;
        top: 0;
        background: #fff;
        z-index: 1;
        height: 49px;
        width: 390px;
        padding-top: 8px;
    }

    .form-control {
        margin: 0 auto;
        width: 380px;
    }
</style>