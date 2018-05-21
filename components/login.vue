<template>
    <div class="container" id="loginPage">
        <img src="/public/login_whale.png">
        <form>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="text" class="form-control" id="email" placeholder="Email" v-model="email">

            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="text" class="form-control" id="password" placeholder="Password" v-model="password">
            </div>
            <button type="submit" class="btn btn-primary" v-on:click="formSubmit" :disabled="disableSubmitButton">Login</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "login",
        data: function(){
            return {
                email: '',
                password: '',

            }
        },
        computed: {
            disableSubmitButton: function() {
                return this.email.length === 0 || this.password.length < 8
            }
        },
        methods: {
            formSubmit: function(e) {
                e.preventDefault();
                var loginInfo = {
                    email: this.email,
                    password: this.password
                };
                $.ajax({
                    type: "POST",
                    url: "/login/validate",
                    dataType: "text",
                    data: loginInfo,
                    success:function(result) {
                        console.log("result: ");
                        console.log(result);
                        // if(result !== "success") {
                        //     self.pressedSubmit = false;
                        //     self.loading = false;
                        //     alert("Email is already in use. Please use a different email and try again.");
                        //     self.email.duplicate = true;
                        // }
                        // else {
                        //     self.$router.push({name: 'profile', params: newUser});
                        // }
                    },
                    error: function() {
                        alert("trouble with sending data to server in login.vue")
                    }
                })
            }
        }
    }
</script>

<style scoped>
    #loginPage {
        max-width: 250px;
        margin: 0 auto;
        padding-top: 80px;
        text-align: center;
    }

    #loginPage img {
        margin-bottom: 20px;
    }
    #loginPage form {
        text-align: left;
    }

    #loginPage button {
        margin-top: 10px;
        width: 100%;
    }
</style>