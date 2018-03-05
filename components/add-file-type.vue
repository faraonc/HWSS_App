<template>
    <div class="multi-select-dropdown btn-group">
        <select-button></select-button>

        <ul class="dropdown-menu" v-on:click="$event.stopPropagation()">
            <div class="form-control-wrapper">
                <input type="text" class="form-control">
            </div>

            <label v-for="fileType in orderedFileTypes">
                <li class="dropdown-item">
                    <input type="checkbox" v-on:click="checkedFileType(fileType)">{{fileType}}
                </li>
            </label>
        </ul>

    </div>
</template>

<script>
    export default {
        name: "add-file-type",
        data: function() {
            return {
                selectedFileTypes: new Set()
            }
        },
        computed: {
            orderedFileTypes: function() {
                return this.$root.fileTypes.sort();
            }
        },
        methods: {
            checkedFileType: function(fileType) {
                this.$root.processSelected("fileTypes", this.selectedFileTypes, fileType);
            }
        }
    }
</script>

<style scoped>

</style>