<template>
    <span>
        <div class="form-control-wrapper">
            <input type="text" class="form-control" v-model="search" placeholder="Search">
        </div>
        <label v-for="region in orderedRegions">
            <li class="dropdown-item" >
                <input type="checkbox" v-on:click="checkedRegion(region)">{{region}}
            </li>
        </label>
    </span>
</template>

<script>
    export default {
        name: "add-region",
        created: function() {
            this.$root.categoryAddedByUser.add(this.$options.name);
        },
        data: function() {
            return {
                search: '',
                selectedRegions: new Set()
            }
        },
        computed: {
            orderedRegions: function() {
                return this.$root.regions.sort().filter(region => {
                    return region.toLowerCase().includes(this.search.toLowerCase());
                });
            }
        },
        methods: {
            checkedRegion: function(region) {
                this.$root.processSelected("regions", this.selectedRegions, region)
            }
        }
    }
</script>

<style scoped>

</style>