const mongoose = require ("mongoose")
const express = require ("express")
const bodyParser = require ("body-parser")

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded ({ urlencoded: true}))

mongoose.connect("mongodb://localhost/transactions", { useNewUrlParser: true })

const Schema = mongoose.Schema
const TransactionSchema = new Schema ({
    amount: Number,
    category: String,
    vendor: String,
    type: String
})
const TransactionModel = mongoose.model("transaction", TransactionSchema)

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})


app.get("/transactions", (req, res) =>{
    TransactionModel.find({}, (err, response) => res.send(response))
   
})

app.post("/transaction", (req, res) =>{
    const newTrans = new TransactionModel (req.body)
console.log(req.body)
newTrans.save()
res.send(res)
}
    )

const port = 8080
app.listen(port, function () {console.log(`Server live on on port ${port}`)})