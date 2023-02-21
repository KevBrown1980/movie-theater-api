const express = require("express");
const app = express();

const {Show} = require("./models/Show")//not sure if this is the right path - may be models/Show
const {User} = require("./models/User")//not sure if this is the right path - may be models/User

const {db} = require("./db")

const port = 3000;

//FIND ALL shows
app.get('/shows', async (request, response) => {
    let allShows = await Show.findAll();
    response.json(allShows)
})

//TARGET show by ID
app.get('/shows/:id', async (req, res) => {
    const showsById = await Show.findByPk(req.params.id)
    res.json(showsById);
})

//FIND ALL users
app.get('/users', async (request, response) => {
    let allUsers = await User.findAll();
    response.json(allUsers)
})

//TARGET user by ID
app.get('/users/:id', async (req, res) => {
    const userById = await User.findByPk(req.params.id)
    res.json(userById);
})



app.listen(port, () => {
    db.sync();
    console.log(`Listening on port ${port}`)
})