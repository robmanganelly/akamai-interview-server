var express = require("express");
const { readDB, resetDB } = require("../utils/fs-driver");
const { writeDB } = require("../utils/write-data");
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

router.post("/data/:times", async (req, res, next) => {
  const times = Number(req.params.times ?? 0);
  console.log({ times });
  const replace = req.query.replace || false;
  let rs = await writeDB(times, replace);
  return res.status(rs ? 201: 400).json({message: !rs ? "Failed file generation":"File generated successfully"})
});
router.patch("/data/reset", async (req, res, next) => {

  let rs = await resetDB();
  return res.status(rs ? 201: 400).json({message: !rs ? "Failed file reset":"File successfully reset"})

});

module.exports = router;
