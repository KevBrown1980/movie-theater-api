const express = require("express");
const app = express();

const {Show} = require("./models/Show")//not sure if this is the right path - may be models/Show
const {User} = require("./models/User")//not sure if this is the right path - may be models/User

const { body, validationResult } = require('express-validator');

const {db} = require("./db")

app.use(express.json()); // Middleware for parsing JSON

const port = 3000;

//GET FIND ALL shows
app.get('/shows', async (request, response) => {
    let allShows = await Show.findAll();
    response.json(allShows)
})

//GET TARGET show by ID
app.get('/shows/:id', async (req, res) => {
    const showsById = await Show.findByPk(req.params.id)
    res.json(showsById);
})

//GET FIND ALL users
app.get('/users', async (request, response) => {
    let allUsers = await User.findAll();
    response.json(allUsers)
})

//GET TARGET user by ID
app.get('/users/:id', async (req, res) => {
    const userById = await User.findByPk(req.params.id)
    res.json(userById);
})

//POST a show


app.post("/shows", 
//cheecks if title is between 3 and 15 chars
body('title').isLength({ min: 3, max: 15 }),
//checks if rating is NOT empty
body('rating').not().isEmpty(),

async (req, res) => {
  //check for erros nd return status
const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    try {
      const newShow = await Show.create(req.body);
      res.status(200).send({ msg: "Success", newShow });
    } catch (error) {
      res.status(500).send({ err: error.message });
    }
  });

//POST a User
// has a validator in it min and max charactors - 3 to 15
//jhas a validator on pssword that is not empty

app.post("/users", 
//checks if username is between 3 and 15 chars
body('username').isLength({ min: 3, max: 15 }),
//checks if password is NOT empty
body('password').not().isEmpty(),
async (req, res) => {
  //check for erros nd return status
const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newUser = await User.create(req.body);
      res.status(200).send({ msg: "Success", newUser });
    } catch (error) {
      res.status(500).send({ err: error.message });
    }
  });

// PUT a show - need to test - unsure how to put details into a thunderclient request

app.put("/shows", async (req, res) => {
    try {
      const putShow = await User.update(req.body.update, {
        where: req.body.where,
      });
      if (putShow[0] > 0) {
        res.status(200).send({ msg: "Success", putShow });
      } else {
        throw new Error("No update made");
      }
    } catch (error) {
      res.status(500).send({ err: error.message });
    }
  });

  // PUT a user - need to test - unsure how to put details into a thunderclient request

app.put("/users", async (req, res) => {
    try {
      const putUser = await User.update(req.body.update, {
        where: req.body.where,
      });
      if (putUser[0] > 0) {
        res.status(200).send({ msg: "Success", putUser });
      } else {
        throw new Error("No update made");
      }
    } catch (error) {
      res.status(500).send({ err: error.message });
    }
  });


//   // DELETE a show - unsure how to delete details into a thunderclient request


  app.delete("/shows/:id", async (req, res) => {
    try {
      // Cannot accept body
      const deletedShow = Show.destroy({ where: { id: req.params.id } });
  
      if (deleted[0] > 0) {
        res.status(200).send({ msg: "Success" });
      } else {
        throw new Error("Not deleted");
      }
    } catch (error) {
      res.status(500).send({ err: error.message });
    }
  });

// // DELETE a user need to test - unsure how to delete details into a thunderclient request

app.delete("/shows/:id", async (req, res) => {
    try {
      // Cannot accept body
      const deletedShow = Show.destroy({ where: { id: req.params.id } });
  
      if (deleted[0] > 0) {
        res.status(200).send({ msg: "Success" });
      } else {
        throw new Error("Not deleted");
      }
    } catch (error) {
      res.status(500).send({ err: error.message });
    }
  });



app.listen(port, () => {
    db.sync();
    console.log(`Listening on port ${port}`)
})