<template>
    <div class="container" id="profile">
        <div>
            <button type="button" class="btn btn-primary">Edit</button>
            <button type="button" class="btn btn-primary" v-on:click="goToSearchPage">Done</button>
        </div>
        <div>
            <i class="fas fa-user-circle"></i>
            <div class="user-info">
                <div>
                    <div><b>Name:</b></div>
                    <div>{{userInfo.firstName}} {{userInfo.lastName}}</div>
                </div>
                <div>
                    <div><b>Email:</b></div>
                    <div>{{userInfo.email}}</div>
                </div>
                <div>
                    <div><b>Password:</b></div>
                    <div>{{userInfo.password}}</div>
                </div>
                <div>
                    <div><b>Organization:</b></div>
                    <div>{{userInfo.organization}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "profile",
        prop: ['userInfo'],
        data: function() {
            return {
                userInfo: {},
            }
        },
        mounted: function() {
            this.userInfo = this.$route.params;
        },
        methods: {
            goToSearchPage: function() {
                this.$router.push('/');
            }
        }
    }
</script>

<style scoped>
    #profile .fa-user-circle {
        font-size: 6em;
        padding:30px 0;
    }
    #profile > div:first-child{
        padding-top: 20px;
        text-align: right;
    }

    #profile > div:first-child .btn {
        margin-right: 15px;
    }
    #profile >div:last-child {
        width: 470px;
        margin: 0 auto;
        text-align: center;
    }
    #profile .user-info > div {
        display:flex;
        margin-bottom: 15px;
        text-align: left;
    }

    #profile .user-info > div > div:first-child {
        width: 120px;
    }
</style>