const { readDB } = require("./generate-entries");

//mock function to simulate paginate data
module.exports = async function getData(resource, page, limit, serialize=false) {
  const data = await readDB();
  const resources = ["accountGroups", "groups", "accountIds"];
  if (!resources.includes(resource)) {
    return [];
  }

  //min page should be 1.
  const start = (page-1) * limit;
  
  //simulate pagination
  if (resource === "groups"){
    return data.groups.slice(start, start + limit);
  }
  // simulate filtering by name and returning only the first x results in alphabetic order
  if (!serialize){
    //return a Map of the first x results in alphabetic order
    const __dataMap = [...Object.entries(data[resource])]
    console.log({oldDataMap: __dataMap}); //TODO remove this line

    __dataMap.sort((previous,current)=>previous[0].localeCompare(current[0]))
    console.log({newDataMap: __dataMap.slice(start, start + limit)}); //TODO remove this line
    
    return Object.fromEntries(__dataMap.slice(start, start + limit));
  }else{
    // return an array of objects with name and networks properties
    return data[resource].keys().sort().slice(start, start + limit).map(key=>({name:key, networks:data[resource][key]}))
  }
}
