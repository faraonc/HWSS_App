<template>
    <div>
        <button class="btn btn-secondary dropdown-toggle dropup select" type="button"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                v-bind:disabled="disableSort === true">
            Sort By
        </button>
        <ul class="dropdown-menu">
            <li class="dropdown-item" @click="sortBy('ctname')">Call Type Name</li>
            <li class="dropdown-item" @click="sortBy('pi')">Publisher's Name</li>
            <li class="dropdown-item" @click="sortBy('old')">Oldest</li>
            <li class="dropdown-item" @click="sortBy('new')">Newest</li>
        </ul>
    </div>

</template>

<script>
    // noinspection JSAnnotator
    export const SORT = 1;
    // noinspection JSAnnotator
    export default {
        name: "sort-by",
        props: ["list", "sort", "disableSort"],
        methods: {
            sortBy: function (input) {

                switch (input) {
                    case 'ctname':
                        this.list.sort(function (a, b) {
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
                        this.list.sort(function (a, b) {
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

                    case 'old':
                        this.list.sort(function (a, b) {

                            var y = a.date / 10000,
                                m = a.date % 10000 / 100,
                                d = a.date % 100,
                                h = a.time / 10000,
                                n = a.time % 10000 / 100,
                                s = a.time % 100;
                            var date_a = new Date(y, m, d, h, n, s);

                                y = b.date / 10000,
                                m = b.date % 10000 / 100,
                                d = b.date % 100,
                                h = b.time / 10000,
                                n = b.time % 10000 / 100,
                                s = b.time % 100;
                            var date_b = new Date(y, m, d, h, n, s);


                            return date_a - date_b;
                        });
                        break;

                    case 'new':
                        this.list.sort(function (a, b) {

                            var y = a.date / 10000,
                                m = a.date % 10000 / 100,
                                d = a.date % 100,
                                h = a.time / 10000,
                                n = a.time % 10000 / 100,
                                s = a.time % 100;
                            var date_a = new Date(y, m, d, h, n, s);

                            y = b.date / 10000,
                                m = b.date % 10000 / 100,
                                d = b.date % 100,
                                h = b.time / 10000,
                                n = b.time % 10000 / 100,
                                s = b.time % 100;
                            var date_b = new Date(y, m, d, h, n, s);


                            return date_b - date_a;
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