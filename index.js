const path = require('path')
const express = require('express');
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended : false}))

app.use(express.static(path.join(__dirname, 'public')))

app.use('/openai', require('./routes/openairoutes'))

app.listen(PORT, () => {
    console.log(`Server is now listening on PORT ${PORT}`)
})


console.log('Hello World!')