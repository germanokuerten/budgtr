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

// INDUCES - Index, New, Delete, Update, Create, Edit, Show

app.get("/", (req, res) => {
    res.send("Home")
})

// Index - GET /budgets

app.get("/budgets/", (req, res) => {

    // // map extracts all of the amounts
    // let sum = budget.map(item => item.amount) 
    // // test
    // console.log(sum)
    // // reduce() method does the sum
    // let bankAccount = sum.reduce((a, b) => a + b, 0)

    // // 2nd method using .forEach()
    // let total = 0;
    // budget.forEach(item => {
    //     total += item.amount
    // })
    // let bankAccount = total

    // 3rd method using .reduce()
    let totalPrice = budget.reduce((total, item) => {
        return parseInt(total) + parseInt(item.amount);
    }, 0);

    let bankAccount = totalPrice

    // parse int   .. to convert string to integer
    // req.body.amount = parseFloat(req.body.amount);
    
    // color change
    let color = "";

    if (bankAccount <=0){
        color = "red"
    } else if (bankAccount >= 1000) {
        color = "green"
    }
    console.log(color) // to see that the color is correct
    res.render('index.ejs', {  //passing objects to index.ejs
    allBudgets: budget, // passing Budget object
    bankA: bankAccount, // passing the BankAccount variable to index.ejs
    col: color, // passing the color variable to index.ejs
})
})

// New - GET /budgets/new  
// Why can't I just have /budgets/new??? Why do I need to do /budgetss? -> B/c I need to follow this order: 
// INDUCES - Index, New, Delete, Update, Create, Edit, Show

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