$(document).ready(function () {

    new Vue({
        el: "#app",
        data: {
            message: "Hello TEST PAGE!",
            flag: true
        },
        methods: {
            makeQuery: function (event) {
                $.ajax({
                    dataType: "json",
                    url: "query/metadata?all",
                    timeout: 5000,
                    success: function (data) {
                        console.log(data);
                    },
                    error: function () {
                        alert("Unable to read data from: " + "query/metadata?all");
                    }
                });
            }
        }
    });
});
