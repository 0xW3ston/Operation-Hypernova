const NodeCache = require('node-cache');
const mainCache = new NodeCache();

const addUserCache = (key,value) => {
  console.log(mainCache.getStats());
  if(mainCache.set(`user:${key}`,value,10)){
    return true;
  }else{
    return false;
  }
}

const getUserCache = (key) => {
  return mainCache.get(`user:${key}`);
}

module.exports = {
  getUserCache,
  addUserCache
}