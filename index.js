const express = require('express')
const app = express()
require('dotenv').config()
require('./models/User')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')

const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

const User = mongoose.model('users')

mongoose.connect(process.env.mongURI)

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [process.env.secret_keys]
    })
)
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user)
        })
})

passport.use(new GoogleStrategy({
    clientID: process.env.Client_ID,
    clientSecret: process.env.Client_Secret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // console.log(accessToken)
    // console.log(refreshToken)
     console.log(profile)

    // new User({
    //     googleId: profile.id
    // }).save()

    User.findOne({googleId: profile.id})
        .then((existingUser) => {
            if(existingUser){
                //we already have a record with the given user id
                done(null, existingUser)
            } else {
                //we are going to make new cord
                new User({googleId: profile.id})
                .save()
                .then( user => done(null, user))
            }
        })
}))

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))


app.get('/api/curuser', (req, res) => {
    res.send(req.user)
})


app.get('/auth/google/callback', passport.authenticate('google'))



// app.get('/', (req, res) => {
//     res.send({'mizan': "how are you you"})
// })


const PORT = process.env.PORT || 5000
app.listen(PORT)