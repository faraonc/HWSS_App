<template>
    <div class="container" id="registerPage">
        <div class="loading-image" v-show="loading === true">
            <img class="center-block" src="/public/loading.gif" width="200">
        </div>
        <div class="header">
            <h1>Sign Up</h1>
            <p>
                Welcome to Humpback Whale Social Call!<br>
                Sign up to join a community of scientists who share whale social calls.
                <span class="side-text">Already have an account? <span class="vue-hyperlinks" v-on:click="goToLogin">Login</span></span>
            </p>
        </div>
        <form>
            <div class="form-group">
                <label for="firstName">First name:</label>
                <input type="text" class="form-control" id="firstName" placeholder="First name" v-model="firstName.name"
                       v-on:focusin="firstName.invalid = false" v-on:focusout="nameExists(firstName)">
                <div class="invalid">{{checkFirstName}}</div>
                <div class="invalid" v-if="firstName.invalid">First name is required</div>
            </div>
            <div class="form-group">
                <label for="lastName">Last name:</label>
                <input type="text" class="form-control" id="lastName" placeholder="Last name" v-model="lastName.name"
                       v-on:focusin="lastName.invalid = false" v-on:focusout="nameExists(lastName)">
                <div class="invalid">{{checkLastName}}</div>
                <div class="invalid" v-if="lastName.invalid">Last name is required</div>
            </div>
            <div class="form-group">
                <label for="email">Email address:</label>
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp"
                       placeholder="email@example.com" v-model="email.name" v-on:focusin="email.invalid = false"
                       v-on:focusout="nameExists(email)">
                <div class="invalid">{{checkEmailValidity}}</div>
                <div class="invalid" v-if="email.invalid">Email is required</div>
                <div class="invalid" v-if="email.duplicate">Email already in use.</div>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" class="form-control" id="password" placeholder="Password"
                       v-model="passwordModel">
                <div v-show="isPasswordMsgOn">
                    <div class="invalid">{{emailExists}}</div>
                    <div class="invalid">{{upperCaseRequirement}}</div>
                    <div class="invalid">{{lowerCaseRequirement}}</div>
                    <div class="invalid">{{specialCharRequirement}}</div>
                    <div class="invalid">{{digitRequirement}}</div>
                    <div class="invalid">{{lengthRequirement}}</div>
                </div>
            </div>
            <div class="form-group">
                <label for="confirmPassword">Confirm password:</label>
                <input type="password" class="form-control" id="confirmPassword" placeholder="Confirm Password"
                       v-model="passwordConfirmModel">
                <div class="invalid">{{confirmPassword}}</div>
            </div>
            <div class="form-group">
                <label for="organization">Organization:</label>
                <select class="form-control" id="organization" v-model="organization.name"
                        v-on:focusin="organization.on = true">
                    <option v-for="school in schools">{{school}}</option>
                </select>
                <div class="invalid">{{confirmOrganization}}</div>
            </div>
            <div class="g-recaptcha" data-sitekey="6LeWQFMUAAAAAEhbd0eUym3S7Q7bRHWFb_Tgkyiy"></div>
            <button type="submit" class="btn btn-primary" v-on:click="formSubmit" :disabled="disableSubmitButton">
                Submit
            </button>
        </form>
        <div v-bind:class="submitPressed"></div>
    </div>
</template>

<script>
    export default {
        name: "registration",
        created: function () {
            var self = this;
            $.ajax({
                url: "/query/resources?schools",
                dataType: "json",
                success: function (result) {
                    self.schools = result;
                    self.schools.push("Other - Not Listed");
                }
            })
        },
        data: function () {
            return {
                schools: new Set(),
                pressedSubmit: false,
                loading: false,
                firstName: {name: "", switched: false, invalid: false, msgDisplayed: false},
                lastName: {name: "", switched: false, invalid: false, msgDisplayed: false},
                email: {name: "", switched: false, invalid: false, msgDisplayed: false, duplicate: false},
                organization: {name: "", on: false},
                passwordModel: "",
                passwordConfirmModel: "",
                isPasswordMsgOn: false,
                isPasswordConfirmMsgOn: false,
                isPasswordModelValid: false,
                isPasswordConfirmModelValid: false,
                isFirstNameOk: false,
                isLastNameOk: false,
                isEmailOk: false,
                isPasswordOk: false,
                isOrganizationOk: false
            }
        },
        computed: {
            submitPressed: function () {
                return {
                    submitted: this.pressedSubmit
                }
            },
            checkFirstName: function () {
                if (this.firstName.name.length === 0) {
                    this.isFirstNameOk = false;
                    if (this.firstName.switched === false) {
                        this.firstName.switched = true;
                        return;
                    }
                }

                if (this.checkName(this.firstName.name)) {
                    this.isFirstNameOk = true;
                    this.firstName.msgDisplayed = false;
                    return "";
                }

                else {
                    this.firstName.msgDisplayed = true;
                    this.isFirstNameOk = false;
                    if (this.firstName.name.length === 0) {
                        return "First name is required"
                    }
                    return "Name must be A-z, a-z, spaces, or non-consecutive hyphens";
                }
            },

            checkLastName: function () {
                if (this.lastName.name.length === 0) {
                    this.isLastNameOk = false;
                    if (this.lastName.switched === false) {
                        this.lastName.switched = true;
                        return;
                    }
                }

                if (this.checkName(this.lastName.name)) {
                    this.isLastNameOk = true;
                    this.lastName.msgDisplayed = false;
                    return "";
                }
                else {
                    this.lastName.msgDisplayed = true;
                    this.isLastNameOk = false;
                    if (this.lastName.name.length === 0) {
                        return "Last name is required"
                    }
                    return "Name must be A-z, a-z, spaces, or non-consecutive hyphens"
                }
            },
            checkEmailValidity: function () {
                this.email.duplicate = false;
                if (this.email.name.length === 0) {
                    if (this.email.switched === false) {
                        this.email.switched = true;
                        return;
                    }
                }
                if (this.checkEmail()) {
                    this.email.msgDisplayed = false;
                    this.isEmailOk = true;
                    return "";
                } else {
                    this.email.msgDisplayed = true;
                    this.isEmailOk = false;
                    if (this.email.name.length === 0) {
                        return "Email is required";
                    }
                    return "Valid email example: text@text.ext";
                }
            },
            upperCaseRequirement: function () {
                if (/[A-Z]/.test(this.passwordModel)) {
                    return "";
                }
                return "At least one upper case English letter";
            },
            lowerCaseRequirement: function () {
                if (/[a-z]/.test(this.passwordModel)) {
                    return "";
                }
                return "At least one lower case English letter";
            },
            digitRequirement: function () {
                if (/[0-9]/.test(this.passwordModel)) {
                    return "";
                }
                return "At least one digit"
            },
            specialCharRequirement: function () {
                if (/[#?!@$%^&*-]/.test(this.passwordModel)) {
                    return "";
                }
                return "At least one special character"
            },
            lengthRequirement: function () {
                if (/.{8,72}/.test(this.passwordModel)) {
                    return "";
                }
                return "Minimum password length 8, maximum 72"
            },
            confirmPassword: function () {
                if (this.isPasswordMsgOn) {
                    if (this.passwordConfirmModel.length === 0) {
                        this.isPasswordOk = false;
                        return "";
                    }
                    if (!this.isPasswordConfirmModelValid) {
                        this.isPasswordOk = false;
                        return "Password does not match";
                    }

                    if (!this.isPasswordModelValid) {
                        this.isPasswordOk = false;
                        return "";
                    }

                    this.isPasswordConfirmMsgOn = false;
                    this.isPasswordOk = true;
                    return "";
                }
            },
            confirmOrganization: function () {
                if (this.organization.name.length != 0) {
                    this.isOrganizationOk = true;
                    return "";
                }

                else {
                    this.isOrganizationOk = false;
                    if (this.organization.on === true) {
                        return "Organization is required";
                    }
                    else {
                        return "";
                    }
                }
            },
            disableSubmitButton: function () {
                if (!this.isFirstNameOk || !this.isLastNameOk || !this.isEmailOk || !this.isPasswordOk
                    || !this.isOrganizationOk) {
                    return true;
                }
                else {
                    return false;
                }
            }
        },

        methods: {
            goToLogin: function () {
                this.$router.push("/login");
            },
            formSubmit: function (e) {
                e.preventDefault();
                this.pressedSubmit = true;
                this.loading = true;
                var self = this;
                var newUser = {
                    firstName: self.firstName.name,
                    lastName: self.lastName.name,
                    email: self.email.name,
                    password: self.password.name,
                    organization: self.organization.name
                };

                $.ajax({
                    type: "POST",
                    url: "/register/insert",
                    dataType: "text",
                    data: newUser,
                    success: function (result) {
                        if (result !== "success") {
                            self.pressedSubmit = false;
                            self.loading = false;
                            alert("Email is already in use. Please use a different email and try again.");
                            self.email.duplicate = true;
                        }
                        else {
                            self.$router.push({name: "profile", params: newUser});
                        }
                    },
                    error: function () {
                        alert("An error occured while executing data submission to the server.")
                    }
                })

            },
            checkEmail: function () {
                let reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
                return reg.test(this.email.name);
            },
            checkPassword: function () {
                let reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,72}$/;
                return reg.test(this.passwordModel);
            },
            checkPasswordConfirm: function () {
                return this.passwordModel === this.passwordConfirmModel;
            },
            checkName: function (name) {
                let reg = /^[^\^!#"%&'()*+\-,.\/\\:;@<>\[\]\{\}\s][a-zA-Z]?([a-zA-Z\s-']+[a-zA-Z]*|[a-zA-Z]*)[^\^!#"%&'()*+\-,.\/\\:;@<>\[\]\{\}\s]$/;
                return reg.test(name);
            },
            nameExists: function (nameObj) {
                if (nameObj.name.length === 0 && !nameObj.msgDisplayed) {
                    nameObj.invalid = true;
                }
                else {
                    nameObj.invalid = false;
                }
            }
        },
        watch: {
            passwordModel: function () {
                this.isPasswordMsgOn = true;
                this.isPasswordModelValid = this.checkPassword();
                this.isPasswordConfirmModelValid = this.checkPasswordConfirm();
            },
            passwordConfirmModel: function () {
                this.isPasswordMsgOn = true;
                this.isPasswordConfirmModelValid = this.checkPasswordConfirm();
            }
        }
    }
</script>

<style scoped>

    .submitted {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #fff;
        opacity: 0.5;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        padding-bottom: 800px;
    }

    #registerPage .center-block {
        position: fixed;
    }
</style>