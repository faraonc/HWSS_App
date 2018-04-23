<template>
    <div class="container" id="registerPage">
        <div class="header">
            <h1>Sign Up</h1>
            <p>
                Welcome to Humpback Whale Social Sound!<br>
                Sign up to join a community of scientists who share whale social calls.
            </p>
        </div>
        <form>
            <div class="form-group">
                <label for="firstName">First name:</label>
                <input type="text" class="form-control" id="firstName" placeholder="First name" v-model="firstName.name" v-on:focusin="firstName.invalid = false" v-on:focusout="nameExists(firstName)">
                <div class="invalid">{{checkFirstName}}</div>
                <div class="invalid" v-if="firstName.invalid">First name is required</div>
            </div>
            <div class="form-group">
                <label for="lastName">Last name:</label>
                <input type="text" class="form-control" id="lastName" placeholder="Last name" v-model="lastName.name" v-on:focusin="lastName.invalid = false" v-on:focusout="nameExists(lastName)">
                <div class="invalid">{{checkLastName}}</div>
                <div class="invalid" v-if="lastName.invalid">Last name is required</div>
            </div>
            <div class="form-group">
                <label for="email">Email address:</label>
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="email@example.com" v-model="email.name" v-on:focusin="email.invalid = false" v-on:focusout="nameExists(email)">
                <div class="invalid">{{checkEmailValidity}}</div>
                <div class="invalid" v-if="email.invalid">Email is required</div>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" class="form-control" id="password" placeholder="Password" v-model="password.name" v-on:focusin="passwordFocusIn" v-on:focusout="passwordFocusOut">
                <div v-show="password.onPassword">
                    <div class="invalid">{{upperCaseRequirement}}</div>
                    <div class="invalid">{{lowerCaseRequirement}}</div>
                    <div class="invalid">{{specialCharRequirement}}</div>
                    <div class="invalid">{{digitRequirement}}</div>
                    <div class="invalid">{{lengthRequirement}}</div>
                </div>
                <div class="invalid">{{password.invalidPasswordMsg}}</div>
            </div>
            <div class="form-group">
                <label for="confirmPassword">Confirm password:</label>
                <input type="password" class="form-control" id="confirmPassword" placeholder="Confirm Password" v-model="passwordConfirm.name" v-on:focusin="passwordConfirm.onPassword = true">
                <div class="invalid">{{confirmPassword}}</div>
            </div>
            <div class="form-group">
                <label for="organization">Organization:</label>
                <select class="form-control" id="organization" v-model="organization">
                    <option v-for="school in schools">{{school.name}}</option>
                </select>
            </div>
            <div class="g-recaptcha" data-sitekey="6LeWQFMUAAAAAEhbd0eUym3S7Q7bRHWFb_Tgkyiy"></div>
            <button type="submit" class="btn btn-primary" v-on:click="formSubmit">Submit</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "registration",
        created: function() {
            var self = this;
             $.ajax({
                url: "http://universities.hipolabs.com/search?country=United%20States",
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                crossDomain: true,
                dataType: "json",
                success: function(result) {
                    self.schools = result
                }
            })
        },
        data: function() {
            return {
                passwordConfirm: {name: '', onPassword: false},
                organization: '',
                firstName: {name: '', switched: false, invalid: false, msgDisplayed: false},
                lastName: {name: '', switched: false, invalid: false, msgDisplayed: false},
                email: {name: '', switched: false, invalid: false, msgDisplayed: false},
                password: {name: '', invalidPasswordMsg: '', onPassword: false},
                organizationNotSelected: [true, false],
                schools: [{name:'testing'}]
            }
        },
        computed: {
            checkFirstName: function() {
                if(this.firstName.name.length === 0) {
                    if(this.firstName.switched === false) {
                        this.firstName.switched = true;
                        return;
                    }
                }
                if(this.checkName(this.firstName.name)) {
                    this.firstName.msgDisplayed = false;
                    return "";
                }
                else {
                    this.firstName.msgDisplayed = true;
                    if(this.firstName.name.length === 0) {
                        return "First name is required"
                    }
                    return "Name must be A-z, a-z, spaces, or non-consecutive hyphens";
                }
            },
            checkLastName: function() {
                if(this.lastName.name.length ===0) {
                    if(this.lastName.switched === false) {
                        this.lastName.switched = true;
                        return;
                    }
                }
                if(this.checkName(this.lastName.name)) {
                    this.lastName.msgDisplayed = false;
                    return "";
                }
                else {
                    this.lastName.msgDisplayed = true;
                    if(this.lastName.name.length === 0) {
                        return "Last name is required"
                    }
                    return "Name must be A-z, a-z, spaces, or non-consecutive hyphens"
                }
            },
            checkEmailValidity: function() {
                if(this.email.name.length === 0) {
                    if(this.email.switched === false) {
                        this.email.switched = true;
                        return;
                    }
                }
                if(this.checkEmail()) {
                    this.email.msgDisplayed = false;
                    return "";
                }
                else {
                    this.email.msgDisplayed = true;
                    if(this.email.name.length === 0) {
                        return "Email is required"
                    }
                    return "Valid email example: text@text.ext"
                }
            },
            checkPasswordValidity: function() {
                if(this.password.name.length === 0) {
                    if(this.password.switched === false) {
                        this.password.switched = true;
                        return;
                    }
                }
            },
            upperCaseRequirement: function() {
                if (/[A-Z]/.test(this.password.name)) {
                    return "";
                }
                return "At least one upper case English letter";
            },
            lowerCaseRequirement: function() {
                if(/[a-z]/.test(this.password.name)) {
                    return "";
                }
                return "At least one lower case English letter";
            },
            digitRequirement: function() {
                if(/[0-9]/.test(this.password.name)) {
                    return "";
                }
                return "At least one digit"
            },
            specialCharRequirement: function() {
                if(/[#?!@$%^&*-]/.test(this.password.name)) {
                    return "";
                }
                return "At least one special character"
            },
            lengthRequirement: function() {
                if(/.{8,72}/.test(this.password.name)) {
                    return "";
                }
                return "Minimum password length 8, maxi 72"
            },
            confirmPassword: function() {
                if(this.passwordConfirm.onPassword) {
                    if(this.password.name === this.passwordConfirm.name) {
                        this.passwordConfirm.onPassword = false;
                        return '';
                    }
                    return "Password does not match";
                }
            }
        },
        methods: {
            formSubmit: function(e) {
                // trim off all white spaces from names
                // this.firstName = this.firstName.trim().replace(/\s\s+/g, ' ');
                // this.lastName = this.lastName.trim().replace(/\s\s+/g, ' ');


                e.preventDefault();

            },
            checkEmail: function() {
                let reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
                return reg.test(this.email.name);
            },
            checkPassword: function() {
                let reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,72}$/;
                return reg.test(this.password.name);
            },
            checkName: function(name) {
                let reg = /^[a-zA-Z\s+]+(-[a-zA-Z\s+]+)?$/;
                return reg.test(name);
            },
            nameExists: function(nameObj) {
                console.log(nameObj)
                if(nameObj.name.length === 0 && !nameObj.msgDisplayed) {
                    nameObj.invalid = true;
                }
                else {
                    nameObj.invalid = false;
                }
            },
            passwordFocusIn: function() {
                this.password.onPassword = true;
                this.password.invalidPasswordMsg = '';
            },
            passwordFocusOut: function() {
                this.password.onPassword = false;
                if(this.checkPassword()) {
                    this.password.invalidPasswordMsg = '';
                }
                else {
                    this.password.invalidPasswordMsg = 'Password is required';
                }
            }
        }
    }
</script>

<style scoped>
    .invalid {
        font-size: .7em;
        color: #e02020;
    }
</style>