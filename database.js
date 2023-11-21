const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('arkhamhand');
const users = db.collection('users');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
    console.log("Trying to connect to Mongo")
  await client.connect();
  await db.command({ ping: 1 });
  console.log("Connected to Mongo")
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

async function getUser(user_name) {
    const query = { username: user_name };
    const cursor = users.findOne(query);
    // return await cursor.toArray();
    return await cursor
}

async function createUser(user) {
  const passwordHash = await bcrypt.hash(user.password, 10);
  user['password'] = passwordHash;
  user['token'] = uuid.v4()
  await users.insertOne(user)
  return user;
}



// TODO: Edit this to use ID instead of user
async function editUser(data,key_to_update) {
  const username = data['username'];
  const updatedvalue = data[key_to_update];
  const filter = { username : username }
  const update = {
    $set: {
      [key_to_update]: updatedvalue
    }
  };

  const foundUser = await getUser(username);
  console.log("Data is",data)
  if (Object.keys(foundUser).length === 0) {
    console.log(username,"not found")
    return;
  }

  // console.log("Updating",username,"'s",key_to_update,"to")
  // console.log(updatedvalue)
  const result = await users.updateOne(filter, update);
  console.log(`${result.modifiedCount} document(s) updated`);
  // console.log(result)
  return result
}



module.exports = { getUser, createUser, editUser };