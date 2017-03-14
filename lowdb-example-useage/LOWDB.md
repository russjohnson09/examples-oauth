# First the schemas need to be defined
db.defaults({ posts: [], user: {} })
  .write()