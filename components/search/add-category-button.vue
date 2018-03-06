<template>
    <div class="added-category">
        <delete-button v-bind:category="category"></delete-button>
        <!--<my-component v-bind:is="component"></my-component>-->

        <div class="multi-select-dropdown btn-group">
            <select-button></select-button>

            <ul class="dropdown-menu" v-on:click="$event.stopPropagation()">

                <my-component v-bind:is="component"></my-component>

            </ul>
        </div>
    </div>
</template>

<script>
    import DeleteButton from "./delete-button.vue";
    import SelectButton from './select-button.vue'
    import AddPublisher from './add-publisher.vue';
    import AddFileType from './add-file-type.vue';
    import AddInstrument from './add-instrument.vue';
    import AddRegion from './add-region.vue';
    import AddSamplingRate from './add-sampling-rate.vue';

    export default {
        components: {DeleteButton, SelectButton, AddPublisher, AddFileType, AddInstrument, AddRegion, AddSamplingRate},
        name: "add-category-button",
        props: ['category', 'component']
    }
</script>

<style scoped>
    button {
        cursor:pointer;
    }
    .added-category {
        text-align: left;
        margin: 0 auto 20px auto;
        max-width: 343px;
    }
</style>