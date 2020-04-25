const express = require('express');
const shortid = require('shortid');

const server = express();

server.use(express.json());

let users = [
    {
        name: 'John Doe',
        bio: 'random things',
        id: '1'
    }
]

server.get('/', (req, res) => {
  res.json({ api: 'running.....'});
});

server.post('/api/users', (req, res) => {
    if (req.body.name !== undefined){
        const userInfo = req.body;
        userInfo.id = shortid.generate();
        users.push(userInfo);
        res.status(201).json(userInfo);
    } else if (req.body === undefined || req.body === undefined) {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    } else {
        res.status(500).json({errorMessage: "There was an error while saving the user to the database"})
    }
});

server.get('/api/users', (req, res) => {
    if (req.body !== undefined){
        res.status(200).json(users);
    } else {
        res.status(500).json({errorMessage: "There was an error while getting the users"})
    }
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    const user = users.find((user) => user.id == id)

    if(user) {
        res.status(200).json(user)
    } else if (user.name == undefined){
        res.status(404).json({message: "The user with the specified ID does not exist"})
    } else {
        res.status(500).json({message: "The user information could not be retrieved."})
    }
});

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const user = users.find((user) => user.id == id)

    if (!user) {
        res.status(404).json({ message: 'User does not exist' });
    } else if (user) {
        users = users.filter(u => u.id != user.id)
        res.status(200).json({message: `User: ${id} deleted`});
    } else {
        res.status(500).json({message: "The user information could not be retrieved."})
    }
});

server.put('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
  
    if (!user) {
      res.status(404).json({ message: 'User does not exist' });
    } else if (user) {
      Object.assign(user, req.body);
      res.status(200).json(user);
    } else {
        res.status(500).json({message: "The user information could not be modified."})
    }
  });


const port = 5005;
server.listen(port, () => console.log(`\n== api on ${port} ==\n`))