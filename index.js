const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const app=express()
const port=8080
const mongo_url='mongodb+srv://sa:sa@projectdb.enabx.mongodb.net/?retryWrites=true&w=majority&appName=projectdb'

app.use(bodyParser.json());

//Database connection
mongoose.connect(mongo_url).then(() => {
  console.log("database connected!");
}) 
.catch((error) => console.log("errror - "+error));

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String
});

const User = mongoose.model('User', userSchema);

//get method
app.get('/getUsers', (req, res) => {

  User.find()
      .then(user => res.send(user))
      .catch(err => res.send('Error: ' +  err));
})

//add new user
app.post('/addUser', (req, res) => {
  const userDetails = req.body;
  const newUser = new User(userDetails);
  
  newUser.save()
    .then(() => res.send('User added!'))
    .catch((error) => res.status(400).send('Error: ' + error));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

