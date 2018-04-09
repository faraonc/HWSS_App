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
                <input type="text" class="form-control" id="firstName" placeholder="First name">
            </div>
            <div class="form-group">
                <label for="lastName">Last name:</label>
                <input type="text" class="form-control" id="lastName" placeholder="Last name">
            </div>
            <div class="form-group">
                <label for="email">Email address:</label>
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="email@example.com">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" class="form-control" id="password" placeholder="Password">
            </div>
            <div class="form-group">
                <label for="confirmPassword">Confirm password:</label>
                <input type="password" class="form-control" id="confirmPassword" placeholder="Confirm Password">
            </div>
            <div class="form-group">
                <label for="organization">Organization:</label>
                <select class="form-control" id="organization">
                    <option>University of Washington</option>
                    <option>New Hampshire University</option>
                    <option>Harvard University</option>
                    <option>Seattle Pacific University</option>
                    <option>Oxford University</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "registration"
    }
</script>

<style scoped>

</style>