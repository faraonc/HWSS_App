<template>
    <div class="multi-select-dropdown">
        <button class="btn btn-secondary btn-lg dropdown-toggle dropup" type="button"
                 data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Select Author
        </button>

        <!--stopPropagation prevents closing of the dropdownmenu when selecting text -->
        <ul class="dropdown-menu" v-on:click="$event.stopPropagation()">
            <div class="form-control-wrapper">
                <input type="text" class="form-control" placeholder="Search">
            </div>

            <label v-for="publisher in orderedPublishers">
                <li class="dropdown-item">
                    <input type="checkbox"
                           v-on:click="checkedPublisher(publisher)">{{publisher.lastName}}, {{publisher.firstName}}
                </li>
            </label>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "add-publisher",
        computed: {
            orderedPublishers: function() {
                console.log("sorting: ", this.$root.publishers)
                return _.orderBy(this.$root.publishers, 'lastName')
            }
        },
        methods: {
            checkedPublisher: function(publisher) {
                console.log("do something with checked publisher: ", publisher);
            }
        }
    }
</script>

<style scoped>
    .multi-select-dropdown .dropdown-menu {
        left: 609px;
    }
</style>