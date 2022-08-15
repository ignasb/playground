// Bring in the express server and create application.
const express = require("express");
const app = express();
const pieRepo = require("./repos/pieRepo");

// Use the express Router object
const router = express.Router();

// Retrieve pies.

// Create GET to return a list of all pies
router.get("/", (req, res, next) => {
  pieRepo.get(
    (data) => {
      res.status(200).json({
        status: 200,
        statusText: "OK",
        message: "All pies retrieved.",
        data: data,
      });
    },
    (err) => {
      next(err);
    },
  );
});

router.get("/:id", (req, res, next) => {
  pieRepo.getById(
    req.params.id,
    (data) => {
      if (data) {
        res.status(200).json({
          status: 200,
          statusText: "OK",
          message: "Single pie retrieved.",
          data: data,
        });
      } else {
        res.status(404).json({
          status: 404,
          statusText: "Not Found",
          message: `The pie '${req.params.id}' could not be found.`,
          error: {
            code: "NOT_FOUND",
            message: `The pie '${req.params.id}' could not be found.`,
          },
        });
      }
    },
    (err) => {
      next(err);
    },
  );
});

// Configure router so all routes are prefixed with /api/
app.use("/api/", router);

// Create a server to listen on port 5000
const server = app.listen(5000, () => {
  console.log("Node server is running on http://localhost:5000...");
});
