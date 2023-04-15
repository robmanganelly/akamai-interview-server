var express = require("express");
const { readDB } = require("../utils/read-db");
var router = express.Router();

/* GET data listing. */
router.get("/:resource", async (req, res, next) => {

  let data = await readDB();

  const resource = req.params.resource;

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

  return res.json({
    status: 200,
    data: {
      [resource]: data[resource],
    },
    message: `${resource} retrieved successfully`,
  });
});

module.exports = router;
