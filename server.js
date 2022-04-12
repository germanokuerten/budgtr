//////////////////////
// Budgtr app
//////////////////////

require("dotenv").config()

const express = require("express")
const app = express()
const PORT = process.env.PORT

const budget = require("./models/budget.js")

const morgan = require("morgan")
const methodOverride = require("method-override")


//////////////
// Middleware
//////////////

app.use(express.urlencoded({extended: false}))
app.use(morgan("tiny"))
app.use("/static", express.static("public"))
app.use(methodOverride("_method")) 


//////////////
// Routes
//////////////

app.get("/", (req, res) => {
    res.send("Home")
})

// Index - GET /budgets

app.get("/budgets/", (req, res) => {
    res.render("index.ejs", {allBudgets: budget})
})

// Show - GET /budgets/:index

app.get("/budgets/:id", (req, res) => {
    res.render("show.ejs", {budgets: budget[req.params.id]})
})

// New - GET /budgets/new

app.get("/budgets/new", (req, res) => {
    res.render("new.ejs")
})

// Create - POST /budgets

app.post("/budgets", (req, res) => {
})


//////////////
// Listener
//////////////

app.listen(PORT, () => {
    console.log(`I am listening in ${PORT}`)
})
