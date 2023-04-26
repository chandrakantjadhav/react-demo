import  Express  from "express";
import Mongoose from "mongoose";
import Cors from "cors"

const app = new Express();

//Cross origin resource sharing option
app.use(Cors);

const port = 4000;

console.time(Mongoose);

await Mongoose
    .connect("mongodb+srv://doadmin:i27U19KB08m6Ctd4@whataspp-response-dde89b76.mongo.ondigitalocean.com/whatsapp_messages?tls=true&authSource=admin&replicaSet=whataspp-response")
    .then(() => console.log("connection successfully with mongodb"))
    .catch((err) => console.error(err));
console.timeEnd(Mongoose);
    app.get('/',(req , resp ) =>{
        resp.send("Hello world");
    });


app.listen( port , ()=>{
    console.log('Server is running at port "{port}" ');
});