const { MongoClient, ObjectId } = require('mongodb')

const connectionUrl = 'mongodb://localhost:27017'
const dbName = 'studyDB'

let db

const init = () =>
  MongoClient.connect(connectionUrl, { useUnifiedTopology: true }).then((client) => {
    db = client.db(dbName)
  })

// Find All Users
const findAllUsers = () => {
  const collection = db.collection('user')
  return collection.find().toArray()
}

// Find User by ID
const findUserById = (id) => {
  const collection = db.collection('user')
  return collection.find({_id: ObjectId(id)}).toArray()
}

// Insert User
const insertUser = (user) => {
  const collection = db.collection('user')
  return collection.insertOne(user)
}

// Update User
const updateUser = (id, user) => {
  const collection = db.collection('user')
  return collection.findOneAndUpdate({
    _id: ObjectId(id)
  },{
    $set: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        age: user.age,
        gender: user.gender,
        address: user.address
    }
  })
}

// Delete User by ID
const deleteUser = (id) => {
  const collection = db.collection('user')
  return collection.deleteOne({ _id: ObjectId(id) })
}

// Find Users by Name
const findUsersByName = (name) => {
  const collection = db.collection('user')
  return collection.find({
    $or: [
      {
        'firstName': {
          $regex: name,
          $options: 'i'
        }
      }, {
        'lastName': {
          $regex: name,
          $options: 'i'
        }
      }
    ]
  }).toArray()
}

module.exports = { init, findAllUsers, findUserById, insertUser, updateUser, deleteUser, findUsersByName }
