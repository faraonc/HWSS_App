<template>
    <span>
        <div class="form-control-wrapper">
            <input type="text" class="form-control" v-model="search" placeholder="Search">
        </div>
        <label v-for="fileType in filteredFileTypes">
            <li class="dropdown-item" >
                <input type="checkbox" @click="processSelection(fileType)">{{fileType}}
            </li>
        </label>
    </span>
</template>

<script>
    export default {
        name: "add-file-type",
        props: ['itemList'],
        data: function () {
            return {
                search: '',
                selectedFileTypes: new Set()
            }
        },
        computed: {
            filteredFileTypes: function () {
                return this.itemList.sort().filter(types => {
                    return types.toLowerCase().includes(this.search.toLowerCase())
                });
            },

        },
        methods: {
            processSelection: function(fileType) {
                this.$emit('checkedItem', "fileType", this.selectedFileTypes, fileType)
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