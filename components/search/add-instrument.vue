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
    /*******************************************
        Force scrollbar visibility
    *******************************************/
    ::-webkit-scrollbar {
        -webkit-appearance: none;
        width: 8px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background-color: rgba(0,0,0,.5);
        -webkit-box-shadow: 0 0 1px rgba(255,255,255,.5);
    }

    /*******************************************
        Multi Select Searchacle Drop Down Menu
    *******************************************/

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

    .multi-select-dropdown li {
        padding: 15px;
    }

    .multi-select-dropdown label {
        margin: 0;
    }

    .multi-select-dropdown li, .multi-select-dropdown label {
        cursor: pointer;
        width: 100%;
    }

</style>