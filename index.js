const express = require('express')
const app = express()



app.get('/', (req, res) => {
    res.send({'mizan': "how are you you"})
})


app.listen(5000)