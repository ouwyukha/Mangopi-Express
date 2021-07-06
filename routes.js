const express = require('express')
const router = express.Router()

const { findAllUsers, findUserById, insertUser, updateUser, deleteUser, findUsersByName } = require('./db')

// Find All Users
router.get('/findAllUsers', (req, res) => {
  findAllUsers()
    .then(user => {
      res.json(user)
    })
    .catch(/* ... */)
})

// Find User by ID
router.get('/findAllUsers/:id', (req, res) => {
  findUserById(req.params.id)
      .then(user => {
        res.json(user)
      })
      .catch(/* ... */)
  })

  // Insert User
router.post('/insertUser', (req, res) => {
  insertUser(req.body)
    .then(result => {
        res.json("Inserted User with id : " + result.insertedId);
    })
    .catch(error => console.error(error))
})

// Update User
router.put('/updateUser/:id', (req, res) => {
  updateUser(req.params.id, req.body)
    .then(() => res.json("Updated User with id : " + req.params.id))
    .catch(error => console.error(error))
})

// Delete User by ID
router.delete('/delete/:id', (req, res) => {
  deleteUser(req.params.id)
    .then(result => {
        console.log(result)
      if (result.deletedCount === 0) {
        return res.json('No user to delete')
      }
  res.json("User deleted with id : " + req.params.id )
    })
    .catch(error => console.error(error))
})

// Find Users by Name
router.get('/findByName/:name', (req, res) => {
  findUsersByName(req.params.name)
    .then(user => {
      res.json(user)
    })
    .catch(/* ... */)
})

module.exports = router
