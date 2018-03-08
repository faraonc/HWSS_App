<template>
    <span>
        <div class="form-control-wrapper">
            <input type="text" class="form-control" v-model="search" placeholder="Search">
        </div>
        <label v-for="instrument in orderedInstruments">
            <li class="dropdown-item" >
                <input type="checkbox" @click="processSelection(instrument)">{{instrument}}
            </li>
        </label>
    </span>
</template>

<script>
    export default {
        name: "add-instrument",
        props: ['itemList'],
        data: function() {
            return {
                search: '',
                selectedInstruments: new Set()
            }
        },
        computed: {
            orderedInstruments: function() {
                return this.itemList.sort().filter(instrument => {
                    return instrument.toLowerCase().includes(this.search.toLowerCase());
                });
            }
        },
        methods: {
            processSelection: function(instrument) {
                this.$emit('checkedItem', "instrument", this.selectedInstruments, instrument)
            }
        }
    }
</script>

<style scoped>

</style>