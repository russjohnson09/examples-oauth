const lowdb = require('lowdb')

// Generate a v1 UUID (time-based)
const uuidV1 = require('uuid/v1');
uuidV1(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'

// Generate a v4 UUID (random)
// const uuidV4 = require('uuid/v4');
// uuidV4(); // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1'

const db = lowdb(__dirname+'/db.json')

// Set some defaults if your JSON file is empty
db.defaults({ posts: [], user: {} })
  .write()

// console.log(db.get('posts'));

// var result = db.get('posts')
//   .find({});
  
  

var id = uuidV1(); 
// Add a post
db.get('posts')
  .push({ id: id, title: 'lowdb is awesome'})
  .write();
  
var result = db.get('posts')
  .find({id:id})
  .value();
  
console.log(result);



posts = db.get('posts')
  .value()
  
  console.log(posts);
  
  
result = db.has('posts')
.value();

// Sort the top five posts.
var result = db.get('posts')
  // .filter({published: true})
  .sortBy('views') //views does not necessarily exist
  .take(5)
  .value();
  
  
var result = // Get post titles.
db.get('posts')
  .map('title')
  .value()
  
var id = uuidV1(); 
// Add a post
db.get('posts')
  .push({ id: id, title: 'low!'})
  .write();
  
  result = // Update a post.
db.get('posts')
  .find({ title: 'low!' })
  .assign({ title: 'hi!'})
  .write();
  
  
  result = // find single post
db.get('posts')
  .find({ title: 'hi!' })
  .value()
  
  
  result = //find first
db.get('posts')
  .find({ title: 'lowdb is awesome'})
  .value()
  
  //list all
  result =
db.get('posts')
  .filter({ title: 'lowdb is awesome'})
  .value()

  
console.log(result);

// Set posts.
db.set('posts', [])
  .write();
  
  
// Set a user
db.set('user.name', 'typicode')
  .value()
return;



  


  
console.log(result);


  
  

  

  

  

  

  
// Get the number of posts.
db.get('posts')
  .size()
  .value()
  
// Get the title of first post using a path.
db.get('posts[0].title')
  .value()
  
  
// Remove posts.

db.get('posts')
  .remove({ title: 'low!' })
  .write()
  
  
// Remove a property.

db.unset('user.name')
  .write()
  
  
// Make a deep clone of posts.

db.get('posts')
  .cloneDeep()
  .value()
  
//getById requires mixin
  // const post = db.get('posts').getById(id).value()