import  Express  from "express";
import Mongoose from "mongoose";
import Cors from "cors"

import bodyParser from "body-parser"
import Transaction from "./model/Transaction.js";

const app = new Express();

//Cross origin resource sharing option
app.use(Cors());
app.use(bodyParser.json());

const port = 4000;

console.time("Mongoose");

await Mongoose
    .connect("mongodb://localhost:27017/react-express")
    .then(() => console.log("connection successfully with mongodb"))
    .catch((err) => console.error(err));
console.timeEnd("Mongoose");

app.get('/',(req , resp ) =>{
    resp.send("Hello world");
});


//create record
app.post('/transaction',async (req , resp ) =>{
    console.log(req.body);
    const {amount , txnDetails , txnDate } = req.body
    const transaction = new Transaction({
        amount : amount,
        txn_details : txnDetails,
        txn_date : txnDate
    });
    await transaction.save();
    // console.log(t);
    resp.json({"status": "success"});
});

//get record
app.get("/transaction" , async (req , res)=> {

    const transaction = await Transaction.find({});
    // console.log('called');
    res.json({success: true , data : transaction});

});

app.listen( port , ()=>{
    console.log('Server is running at port '+ port);
});