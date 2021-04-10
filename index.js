const express = require('express')
const app = express()
require('dotenv').config()

const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy



passport.use(new GoogleStrategy({
    clientID: process.env.Client_ID,
    clientSecret: process.env.Client_Secret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    console.log(accessToken)
    console.log(refreshToken)
    console.log(profile)
}))

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))


app.get('/auth/google/callback', passport.authenticate('google'))



// app.get('/', (req, res) => {
//     res.send({'mizan': "how are you you"})
// })


const PORT = process.env.PORT || 5000
app.listen(PORT)