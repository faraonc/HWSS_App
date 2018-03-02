<template>
    <div class="multi-select-dropdown">
        <button class="btn btn-secondary btn-lg dropdown-toggle dropup" type="button"
                 data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Select Author
        </button>

        <!--stopPropagation prevents closing of the dropdownmenu when selecting text
        data-ng-click="$event.stopPropagation()" -->
        <ul class="dropdown-menu">
            <div class="form-control-wrapper">
                <input type="text" class="form-control" placeholder="Search">
            </div>

            <label data-ng-repeat="option in authors | orderBy: 'last' | filter: searchQuery">
                <li class="dropdown-item">
                    <input type="checkbox" data-ng-click="updateCheckedAuthor(option)">{{option.last}},&nbsp;{{option.first}}&nbsp;{{option.middle}}
                </li>
            </label>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "add-publisher"
    }
</script>

<style scoped>

</style>