<template>
    <div class="container" id="loginPage">
        <img src="/public/login_whale.png">
        <form>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="text" class="form-control" id="email" placeholder="Email" v-model="email">
                <div class="invalid">{{emailErrorMsg}}</div>

            </div>
            <div class="form-group">
                <label for="loginPassword">Password: <span class="pass-show-hide" v-on:click="switchPasswordVisible">{{showHideState}}</span></label>
                <input :type="passwordVisibility" class="form-control" id="loginPassword" placeholder="Password" v-model="password">
                <div class="invalid">{{passwordErrorMsg}}</div>
            </div>
            <button type="submit" class="btn btn-primary" v-on:click="formSubmit" :disabled="disableSubmitButton">Login</button>
            <div class="side-text">Don't have an account? <span class="vue-hyperlinks" v-on:click="goToRegister">Register</span></div>
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
                showHideState: 'show',
                passwordVisibility: 'password',
                emailErrorMsg: '',
                passwordErrorMsg: ''
            }
        },
        computed: {
            disableSubmitButton: function() {
                return this.email.length === 0 || this.password.length < 8
            }
        },
        methods: {
            goToRegister: function() {
                this.$router.push('/register');
            },
            switchPasswordVisible: function() {
                if(this.showHideState === 'show') {
                    this.showHideState = 'hide';
                    this.passwordVisibility = 'text';
                }
                else {
                    this.showHideState = 'show';
                    this.passwordVisibility = 'password';
                }
            },
            formSubmit: function(e) {
                var self = this;
                e.preventDefault();
                var loginInfo = {
                    email: this.email,
                    password: this.password
                };
                $.ajax({
                    type: "POST",
                    url: "/login/validate",
                    dataType: "json",
                    data: loginInfo,
                    success:function(result) {
                        if(result.code === "wrongPassword") {
                            self.emailErrorMsg = '';
                            self.passwordErrorMsg = result.msg;
                        }
                        else if (result.code === "wrongEmail") {
                            self.passwordErrorMsg = '';
                            self.emailErrorMsg = result.msg;
                        }
                        else {
                            // success
                            self.emailErrorMsg = '';
                            self.passwordErrorMsg = '';
                            self.$router.push('/');
                        }
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
    #loginPage label {
        width: 250px;
    }
    span.pass-show-hide {
        display:inline-block;
        float: right;
        font-size: .8em;
        padding-top: 4px;
        cursor: pointer;
        color: blue;
    }
    span.pass-show-hide:hover {
        text-decoration: underline;
    }
</style>