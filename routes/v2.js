var express = require("express");
const getData = require("../utils/get-data");
var router = express.Router();

const { resetDB } = require("../utils/fs-driver");
const { writeDB } = require("../utils/write-data");

/* GET data listing. */
router.get("/index", async (req, res, next) => {
  res.status(200).json({ data: "Express", message: 'navigate to http://localhost:3000' });
});

router.get("/:resource/:page", async (req, res, next) => {
  console.log({ params: req.params });

  const { resource, page } = req.params;
  const limit = req.query.limit || 10;
  const serialize = req.query.serialize === "true";

  if (
    !resource ||
    !["accountGroups", "groups", "accountIds"].includes(resource)
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


  const __data = await getData(resource, page, limit, serialize);

  return res.json({
    status: 200,
    data: {
      [resource]: __data,
    },
    meta: { page, limit, items: __data.length },
    message: `${resource} retrieved successfully`,
  });
});

router.post("/data/:times", async (req, res, next) => {
  const times = Number(req.params.times ?? 0);
  console.log({ times });
  const replace = req.query.replace || false;
  let rs = await writeDB(times, replace);
  return res
    .status(rs ? 201 : 400)
    .json({
      message: !rs ? "Failed file generation" : "File generated successfully",
    });
});

router.patch("/data/reset", async (req, res, next) => {
  let rs = await resetDB();
  return res
    .status(rs ? 201 : 400)
    .json({ message: !rs ? "Failed file reset" : "File successfully reset" });
});

module.exports = router;
