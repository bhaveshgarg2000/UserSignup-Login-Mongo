const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt')

// Root route
router.get('/', (req, res) => {
    res.send('root route');
})

// SIGNUP API
router.post('/users/signup',async(req, res)=>{

    const saltPassword = await bcrypt.genSalt(12)
    const securePassword = await bcrypt.hash(req.body.password, saltPassword)

    const signedUpUser = new User({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        password:securePassword,
        email:req.body.email,
        age:req.body.age,

    })
    signedUpUser.save()
    .then(data =>{
        res.json(data)
    })
    .catch(error=>{
        res.json(error)
    })
})

// LOGIN API
router.post("/users/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        const cmp = await bcrypt.compare(req.body.password, user.password);
        if (cmp) {
          res.send("Logged In Successful");
        } else {
          res.send("Wrong username or password.");
        }
      } 
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server error Occured");
    }
  });



// GET REQUEST API
router.get('/users', async (req, res) => {
    try {
        const usersData = await User.find()
        res.send(usersData);
    } catch (err) {
        res.send(err);

    }
});


// Exporting router
module.exports = router;





























// POST REQUEST API


// router.post('/signup', async (req, res) => {
//     try {
//         const user = new User(req.body);
//         const createUser = await user.save();
//         res.status(201).send(createUser);
//         console.log(createUser)
//     } catch (err) {
//         res.status(400).send(err)
//     }
// });

// GET REQUEST API
// router.get('/userd', async (req, res) => {
//     try {
//         const usersData = await User.find()
//         res.send(usersData);
//     } catch (err) {
//         res.send(err);

//     }
// });

