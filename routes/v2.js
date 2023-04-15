var express = require("express");
var router = express.Router();

//mock function to simulate paginate data
function getData(resource, page, limit, serialize=false) {
  const data = require("../data/data");
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

/* GET data listing. */
router.get("/:resource/:page", async (req, res, next) => {
  console.log({ params: req.params });

  const { resource, page } = req.params;
  const limit = req.query.limit || 10;
  const serialize = req.query.serialize === "true";

  if (
    !resource ||
    !["index", "accountGroups", "groups", "accountIds"].includes(resource)
  ) {
    const status = !resource ? 400 : 404;
    return res.status(status).json({
      status,
      message: "Invalid request",
      error: `Invalid request: resource ${
        !resource ? "not provided" : "does not exist"
      }`,
    });
  }
  if (resource === "index") return res.status(200).json({ data: "Express" });

  const __data = getData(resource, page, limit, serialize);

  return res.json({
    status: 200,
    data: {
      [resource]: __data,
    },
    meta:{page,limit, items: __data.length },
    message: `${resource} retrieved successfully`,
  });
});



router.post("/:entries", async (req, res, next) => {});

module.exports = router;
