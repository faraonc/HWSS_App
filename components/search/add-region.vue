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
                this.$emit('checkedItem', "regions", this.selectedRegions, region)
            }
        }
    }
</script>

<style scoped>

</style>