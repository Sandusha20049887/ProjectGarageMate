const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app=express()
const port=8000
const mongo_url='mongodb+srv://sa:sa@projectdb.enabx.mongodb.net/?retryWrites=true&w=majority&appName=projectdb'

// Enable CORS for all routes
app.use(cors());
app.use(bodyParser.json());

//Database connection
mongoose.connect(mongo_url).then(() => {
  console.log("database connected!");
}) 
.catch((error) => console.log("errror - "+error));

const userSchema = new mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  phoneNo: Number,
  email: String
});

const postSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: String,
  faultDescription: String,
  garageName: String,
  garageAddress: String,
  contactNo: Number,
  userName: String,
  datePosted: Date,
  status: String
});


const User = mongoose.model('user', userSchema);
const Post = mongoose.model('post', postSchema);

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

//get posts method
app.get('/getPost', (req, res) => {

  Post.find()
      .then(post => res.send(post))
      .catch(err => res.send('Error: ' +  err));
})

//get posts by user
app.get('/getPost/:id', (req, res) => {
  const uname = req.params.id;
  console.log(uname);
  Post.find({ userName: uname})
      .then(post => res.send(post))
      .catch(err => res.send('Error: ' +  err));
})

//add new Post
app.post('/addPost', (req, res) => {
  const postDetails = req.body;
  const newPost = new Post(postDetails);
  
  newPost.save()
    .then(() => res.send('Post added!'))
    .catch((error) => res.status(400).send('Error: ' + error));
});

//update post
app.put('/updatePost/:id',(req,res) => {
  const postID = req.params.id;
  const updatedDetails = req.body;

  const updatePost = new Post(updatedDetails);

  Post.findByIdAndUpdate(postID, updatePost, {new : true})
  .then(() => res.send('Post Updated!'))
  .catch((error) => res.status(400).send('Error: '+ error))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

