var express = require("express");
const getData = require("../utils/get-data");
var router = express.Router();


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

  const __data = await getData(resource, page, limit, serialize);

  return res.json({
    status: 200,
    data: {
      [resource]: __data,
    },
    meta:{page,limit, items: __data.length },
    message: `${resource} retrieved successfully`,
  });
});



router.post("/:entries", async (req, res, next) => {

});

module.exports = router;
