<template>
    <span>
        <div class="form-control-wrapper">
            <input type="text" class="form-control" v-model="search" placeholder="Search">
        </div>
        <label v-for="fileType in filteredFileTypes">
            <li class="dropdown-item" >
                <input type="checkbox" v-on:click="checkedFileType(fileType)">{{fileType}}
            </li>
        </label>
    </span>
</template>

<script>
    export default {
        name: "add-file-type",
        created: function() {
            this.$root.categoryAddedByUser.add(this.$options.name);
        },
        data: function () {
            return {
                search: '',
                selectedFileTypes: new Set()
            }
        },
        computed: {
            filteredFileTypes: function () {
                return this.$root.fileTypes.sort().filter(types => {
                    return types.toLowerCase().includes(this.search.toLowerCase())
                });
            },

        },
        methods: {
            checkedFileType: function (fileType) {
                this.$root.processSelected("fileTypes", this.selectedFileTypes, fileType);
            }
        }
    }
</script>

<style scoped>

</style>