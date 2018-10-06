<template>
    <span>
        <div class="form-control-wrapper">
            <input type="text" class="form-control" v-model="search" placeholder="Search">
        </div>
        <label v-for="region in orderedRegions">
            <li class="dropdown-item" >
                <input type="checkbox" @click="processSelection(region)">{{region}}
            </li>
        </label>
    </span>
</template>

<script>
    export default {
        name: "add-region",
        props: ['itemList'],
        data: function() {
            return {
                search: '',
                selectedRegions: new Set()
            }
        },
        computed: {
            orderedRegions: function() {
                return this.itemList.sort().filter(region => {
                    return region.toLowerCase().includes(this.search.toLowerCase());
                });
            }
        },
        methods: {
            processSelection: function(region) {
                this.$emit('checkedItem', "region", this.selectedRegions, region)
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