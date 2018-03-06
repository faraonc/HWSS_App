<template>
    <span>
        <div class="form-control-wrapper">
            <input type="text" class="form-control" v-model="search" placeholder="Search">
        </div>
        <label v-for="instrument in orderedInstruments">
            <li class="dropdown-item" >
                <input type="checkbox" v-on:click="checkedInstrument(instrument)">{{instrument}}
            </li>
        </label>
    </span>
</template>

<script>
    export default {
        name: "add-instrument",
        created: function() {
            this.$root.categoryAddedByUser.add(this.$options.name);
        },
        data: function() {
            return {
                search: '',
                selectedInstruments: new Set()
            }
        },
        computed: {
            orderedInstruments: function() {
                return this.$root.instruments.sort().filter(instrument => {
                    return instrument.toLowerCase().includes(this.search.toLowerCase());
                });
            }
        },
        methods: {
            checkedInstrument: function(instrument) {
                this.$root.processSelected("instruments", this.selectedInstruments, instrument)
            }
        }
    }
</script>

<style scoped>

</style>