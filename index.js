const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const connect = () => {
    return mongoose.connect("mongodb+srv://yadav9452:1234@cluster0.zup5e.mongodb.net/Cluster0?retryWrites=true&w=majority")
}
// user schema

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String, required: false },
    lastName: { type: String, required: true },
    age: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    gender: { type: String, required: true },
    type: { type: String, required: false },
}, {
    versionKey: false,
    timestamps: true,

}
);
const User = mongoose.model("user", userSchema);


//branch Schema

const branchSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    IFSC: { type: String, required: true },
    MICR: { type: Number, required: true },

}, {
    versionKey: false,
    timestamps: true,

}
);
const Branch = mongoose.model("branch", branchSchema);


//master Account
const MasterSchema = new mongoose.Schema({

    balance: { type: String, required: true },

}, {
    versionKey: false,
    timestamps: true,

}
);
const Master = mongoose.model("MasterAccount", MasterSchema);

//savingAccount
const savingSchema = new mongoose.Schema({

    account_number: { type: String, required: true,unique:true },
    balance: { type: String, required: true },
    interestRate : { type: String, required: true },
   

}, {
    versionKey: false,
    timestamps: true,

}
);

const Saving = mongoose.model("savingAccount", savingSchema);

// //fixed account
const fixedSchema = new mongoose.Schema({
    account_number : { type: String, required: true },
    balance : { type: String, required: false },
    interestRate : { type: String, required: true },
    startDate : { type: String, required: true },
    maturityDate : { type: String, required: true },
}, {
    versionKey: false,
    timestamps: true,

}
);
const Fixed = mongoose.model("fixedSchema", fixedSchema);

//user crud
app.get("/users",async(req,res)=>{
    try{
        const users=await User.find().lean().exec();
        return res.status(200).send(users);
    }catch(err){
        return res
        .status(500)
        .send({message:"Something Went wrong ... try again"});
    }
});

//masteraccount crud

app.get("/masteraccount",async(req,res)=>{
    try{
        const master=await Master.find().lean().exec();
        return res.status(200).send(master);
    }catch(err){
        return res
        .status(500)
        .send({message:"Something Went wrong ... try again"});
    }
});

// post for saving account
app.post("/savings",async(req,res)=>{
    try{
        const saving=await Saving.create(req.body);
        return res.status(200).send(saving);
    }catch(err){
        return res
        .status(500)
        .send({message:"Something Went wrong ... try again"});
    }
});

//post api to create fixed account
app.post("/fixed",async(req,res)=>{
    try{
        const fixed=await Fixed.create(req.body);
        return res.status(200).send(fixed);
    }catch(err){
        return res
        .status(500)
        .send({message:"Something Went wrong ... try again"});
    }
});

// GET API that takes the master account id and returns a list of all the accounts that the user has but only the account_number and balance
app.get("/masteraccount/:id",async(req,res)=>{
    try{
        const master=await Master.findById(req.param.id).lean().exec();
        return res.status(200).send(master);
    }catch(err){
        return res
        .status(500)
        .send({message:"Something Went wrong ... try again"});
    }
});


app.listen(5000, async () => {
    try {
        await connect();
    }
    catch (err) {
        console.log(err);
    }
    console.log("Listening to Port 5000");
});