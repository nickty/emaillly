const express = require('express')
const app = express()



app.get('/', (req, res) => {
    res.send({'mizan': "how are you you"})
})


const PORT = process.env.PORT || 5000
app.listen(PORT)