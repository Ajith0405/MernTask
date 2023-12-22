require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UsersModel = require('./models/Users')
const ObjectId = require('mongodb');

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGODB_URI);
const port = process.env.PORT || 3001;

// Register
app.post('/register', (req, res)=>{
    UsersModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

// Login
app.post('/login', (req, res) => {
    const {email, password} = req.body;
    UsersModel.findOne({email: email})
    .then(user =>{
        if(user){
            if(user.password === password){
                // res.json("Success")
                res.json(user)
            }else{
                res.json("The password is incorrect")
            }
        }else{
            res.json("No user is found please register")
        }
    })
})

// Get User details
app.get('/getUser/:id',(req, res)=>{
    const id = req.params.id;
    UsersModel.findById({_id:id})
    .then(user=>{
        res.json(user)
    })
    .catch(err => res.json(err))
})

// Update User details
app.put('/updateUser/:id', (req, res) =>{
    const id = req.params.id;
    UsersModel.findByIdAndUpdate({_id:id}, {
        age: req.body.age, 
        dob: req.body.dob, 
        gender: req.body.gender,
        mobile: req.body.mobile, 
        highEdu: req.body.highEdu})
    .then(user=>{
        res.json(user)
    })
    .catch(err => res.json(err))
})


app.listen(port,()=>{
    console.log("server is running");
})