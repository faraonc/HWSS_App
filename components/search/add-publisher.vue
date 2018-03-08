<template>
    <span>
        <div class="form-control-wrapper">
            <input type="text" class="form-control" v-model="search" placeholder="Search">
        </div>
        <label v-for="publisher in filteredPublishers">
            <li class="dropdown-item">
                <input type="checkbox"
                       @click="processSelection(publisher)">{{publisher.lastName}}, {{publisher.firstName}}
            </li>
        </label>
    </span>
</template>

<script>

    export default {
        name: "add-publisher",
        props: ['itemList'],
        data: function () {
            return {
                search: '',
                selectedPublishers: new Set()
            }
        },
        computed: {
            filteredPublishers: function () {
                return _.orderBy(this.itemList, 'lastName').filter( name => {
                    return name.firstName.toLowerCase().includes(this.search.toLowerCase()) ||
                    name.lastName.toLowerCase().includes(this.search.toLowerCase())
                });
            }
        },
        methods: {
            processSelection: function(publisher) {
                this.$emit('checkedItem', "publisher", this.selectedPublishers, publisher)
            }
        }
    }
</script>

<style scoped>

</style>