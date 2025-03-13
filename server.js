const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require ('./controllers/signin');
const profile = require ('./controllers/profile');
const image = require ('./controllers/image');


const db = knex({
  // Enter your own database information here based on what you created
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true
  }
});
db.select('*').from('users').then(data => {
  console.log(data);
});

const app = express();

app.use(cors())
app.use(express.json()); 
//app.get('/', (req,res) => {res.send(database.users)})
app.get("/", (req, res) => {
  res.send("it's working!");
  });
app.post('/signin', (req,res)=> { signin.handleSignin (req, res, db, bcrypt)})
app.post('/register', (req, res) => { register.handleRegister (req, res, db, bcrypt)})
app.get('/profile/:id', (req,res ) => { profile.handleProfileGet (req, res, db)})
app.put('/image', (req, res) => { image.handleImage (req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApicall(req, res)})

const PORT = process.env.PORT||'3000';

app.listen(PORT, () => {
  console.log(`app is running on port ${process.env.PORT}`);
  });
