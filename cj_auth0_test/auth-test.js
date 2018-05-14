(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
var auth0_var = require('./auth0-var');


$('document').ready(function() {

    var loginStatus = $('.container h4');
    var loginView = $('#login-view');
    var homeView = $('#home-view');

    // buttons and event listeners
    var homeViewBtn = $('#btn-home-view');
    var loginBtn = $('#btn-login');
    var logoutBtn = $('#btn-logout');

    homeViewBtn.click(function() {
        homeView.css('display', 'inline-block');
        loginView.css('display', 'none');
    });

    var webAuth = new auth0.WebAuth({
        domain: auth0_var.AUTH0_DOMAIN,
        clientID: auth0_var.AUTH0_CLIENT_ID,
        redirectUri: auth0_var.AUTH0_CALLBACK_URL,
        audience: 'https://' + auth0_var.AUTH0_DOMAIN + '/userinfo',
        responseType: 'token id_token',
        scope: 'openid'
    });

    loginBtn.click(function(e) {
        e.preventDefault();
        webAuth.authorize();
    });

    logoutBtn.click(logout);

    function setSession(authResult) {
        // Set the time that the Access Token will expire at
        var expiresAt = JSON.stringify(
            authResult.expiresIn * 1000 + new Date().getTime()
        );
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
    }

    function logout() {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        displayButtons();
    }

    function isAuthenticated() {
        // Check whether the current time is past the
        // Access Token's expiry time
        var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    function handleAuthentication() {
        webAuth.parseHash(function(err, authResult) {
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                setSession(authResult);
                loginBtn.css('display', 'none');
                homeView.css('display', 'inline-block');
            } else if (err) {
                homeView.css('display', 'inline-block');
                console.log(err);
                alert(
                    'Error: ' + err.error + '. Check the console for further details.'
                );
            }
            displayButtons();
        });
    }

    function displayButtons() {
        if (isAuthenticated()) {
            loginBtn.css('display', 'none');
            logoutBtn.css('display', 'inline-block');
            loginStatus.text('You are logged in!');
        } else {
            loginBtn.css('display', 'inline-block');
            logoutBtn.css('display', 'none');
            loginStatus.text('You are not logged in! Please log in to continue.');
        }
    }

    handleAuthentication();

});
},{"./auth0-var":2}],2:[function(require,module,exports){
const AUTH0_DOMAIN = "hwss.auth0.com";
const AUTH0_CLIENT_ID = "iVJo26xyBUgYxpu1GZiqe2ZDDP47Sv8B";
const AUTH0_CALLBACK_URL = "http://localhost:8080/auth.html";
//     redirectUri: AUTH0_CALLBACK_URL,
//     audience: 'https://' + AUTH0_DOMAIN + '/userinfo',
//     responseType: 'token id_token',
//     scope: 'openid'
// });


module.exports = {

    AUTH0_DOMAIN: AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: AUTH0_CLIENT_ID,
    AUTH0_CALLBACK_URL: AUTH0_CALLBACK_URL
};
},{}]},{},[1]);
