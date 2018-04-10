<template>
    <transition name="upload">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <slot name="header">
                            File Upload
                        </slot>
                        <a id="closeBtn" class="modal-default-button" @click="$emit('close')">&#10060;</a>
                    </div>


                    <form>
                        <div class="form-group">
                            <label for="privacy">Privacy:</label>
                            <select class="form-control" id="privacy">
                                <option>Public: Everyone can see it</option>
                                <option>Shared: Only people you select can access the file</option>
                                <option>Private: Only you have access to the file</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="dateTime">Record Date and Time:</label>
                            <input id="dateTime" type="datetime-local" placeholder="">
                        </div>
                        <div class="form-group">
                            <label for="location">Location:</label>
                            <input type="text" class="form-control" id="location" placeholder="Location">
                        </div>

                        <div class="form-group">
                            <div id="coordinates">
                                <label for="coordinates">Coordinates:</label>
                                <div class="row">
                                    <div class="form-group name1 col-md-6">
                                        <input type="double" class="form-control" placeholder="Lattitude">
                                    </div>
                                    <div class="form-group name2 col-md-6">
                                        <input type="double" class="form-control" placeholder="Longtitude">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="instrument">Instrument:</label>
                            <input type="text" class="form-control" id="instrument"
                                   placeholder="Specify the recording instrument">
                        </div>
                        <div class="form-group">
                            <label for="frequency">Frequency</label>
                            <input type="double" class="form-control" id="frequency" placeholder="0 Hz">
                        </div>
                        <div class="form-group">
                            <label for="description">Description:</label>
                            <textarea rows="4" cols="50" type="text" class="form-control" id="description"
                                      placeholder=""
                                      v-model="message" v-on:keyup="charactersLeft">
                </textarea>
                            <!--TODO-->
                            <p class="text-right text-small"> {{remainingChars}}</p>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>

    export default {
        name: "upload",
        data: {
            hasError: false,
            maxChars: 3,
            remainingChars: 3,
            message: ''
        },
        methods: {
            charactersLeft: function () {
                var char = this.message.length;
                this.remainingChars = this.maxChars - char;
            }
        }

    }

</script>

<style scoped>

</style>