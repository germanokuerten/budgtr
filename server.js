//////////////////////
// Budgtr app
//////////////////////

// .env
require("dotenv").config()

// Dependencies
const express = require("express")
const app = express()

// Config
const PORT = process.env.PORT

// Database
const budget = require("./models/budget.js")

// Sub Dependencies
const morgan = require("morgan")
const methodOverride = require("method-override")


//////////////
// Middleware
//////////////

// Body Parser
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Morgan Dep
app.use(morgan("tiny"))

// Static
app.use("/static", express.static("public"))

// MethodOverride Dep
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

// New - GET /budgets/new  
// Why can't I just have /budgets/new??? Why do I need to do /budgetss?

app.get("/budgets/new", (req, res) => {
    res.render("new.ejs")
  })

// Create - POST /budgets

app.post("/budgets", (req, res) => {
    req.body = req.body
    budget.push(req.body)
    console.log(budget)
    res.redirect("/budgets")
})

app.post("/budgets", (req, res) => {
    console.log("req body is", req.body)
    res.send("request received")
})

// Show - GET /budgets/:index

app.get("/budgets/:id", (req, res) => {
    res.render("show.ejs", {budgets: budget[req.params.id]})
});

// app.post("/budgets/", (req, res) => {
// })

//////////////
// Listener
//////////////

app.listen(PORT, () => {
    console.log(`I am listening in ${PORT}`)
})