<template>
    <div>
        <button class="btn btn-secondary dropdown-toggle dropup select" type="button"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-bind:disabled="disableSort === true">
            Sort By
        </button>
        <ul class="dropdown-menu">
            <li class="dropdown-item" @click="sortBy('ctname')">Call Type Name</li>
            <li class="dropdown-item" @click="sortBy('pi')">Publisher's Name</li>
            <li class="dropdown-item" @click="sortBy('date')">Date</li>
        </ul>
    </div>

</template>

<script>
    export const SORT = 1;
    export default {
        name: "sort-by",
        props: ["list", "sort", "disableSort"],
        methods: {
            sortBy: function (input) {

                switch (input){
                    case 'ctname':
                        this.list.sort(function(a, b) {
                            var nameA = a.callTypeName.toUpperCase(); // ignore upper and lowercase
                            var nameB = b.callTypeName.toUpperCase(); // ignore upper and lowercase
                            if (nameA < nameB) {
                                return -1;
                            }
                            if (nameA > nameB) {
                                return 1;
                            }
                            // names must be equal
                            return 0;
                        });
                        break;

                    case 'pi':
                        this.list.sort(function(a, b) {
                            var nameA = a.pi.toUpperCase(); // ignore upper and lowercase
                            var nameB = b.pi.toUpperCase(); // ignore upper and lowercase
                            if (nameA < nameB) {
                                return -1;
                            }
                            if (nameA > nameB) {
                                return 1;
                            }
                            // names must be equal
                            return 0;
                        });
                        break;

                    case 'date':
                        this.list.sort(function(a, b) {
                            return a.date - b.time;
                        });
                        break;
                }
                this.sort.push(SORT);
            }
        }
    }
</script>

<style scoped>

</style>