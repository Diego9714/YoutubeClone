const express = require('express')
const app     = express()
const _var    = require('./global/_var.js')
const cors    = require('cors')

// Url-Routes
const comment = require('./routes/comment.routes.js')
const reaction = require('./routes/reaction.routes.js')


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

// Server
app.listen(_var.PORT, (err) => {
    if(err) throw err
	console.log(`Server running on http://localhost:${_var.PORT}`)
})

// Routes
app.use(comment)
app.use(reaction)