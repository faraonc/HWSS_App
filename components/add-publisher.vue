<template>
    <div class="multi-select-dropdown btn-group">
        <select-button></select-button>

        <!-- TODO implement search filtering-->
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
        data: function() {
            return {
                selectedPublishers: new Set()
            }
        },
        computed: {
            orderedPublishers: function() {
                console.log("sorting: ", this.$root.publishers)
                return _.orderBy(this.$root.publishers, 'lastName')
            }
        },
        methods: {
            checkedPublisher: function(publisher) {
                this.$root.processSelected("publishers", this.selectedPublishers, publisher)
            }
        }
    }
</script>

<style scoped>

</style>