// Bring in the express server and create application.
const express = require("express");
const app = express();
const pieRepo = require("./repos/pieRepo");

// Use the express Router object
const router = express.Router();

// Configure middleware to support JSON data parsing in request object
app.use(express.json());

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

router.get("/search", (req, res, next) => {
  const searchObject = {
    id: req.query.id,
    name: req.query.name,
  };

  pieRepo.search(
    searchObject,
    (data) => {
      res.status(200).json({
        status: 200,
        statusText: "OK",
        message: "Pies search result",
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

router.post("/", (req, res, next) => {
  pieRepo.insert(
    req.body,
    (data) => {
      res.status(200).json({
        status: 201,
        statusText: "Created",
        message: "New Pie Added.",
        data: data,
      });
    },
    (err) => {
      next(err);
    },
  );
});

router.put("/:id", (req, res, next) => {
  pieRepo.getById(req.params.id, (data) => {
    if (data) {
      pieRepo.update(
        req.body,
        req.params.id,
        (data) => {
          res.status(200).json({
            status: 200,
            statusText: "OK",
            message: `Pie ${req.params.id} updated.`,
            data: data,
          });
        },
        (err) => {
          next(err);
        },
      );
    }
  });
});

router.delete("/:id", (req, res, next) => {
  pieRepo.getById(req.params.id, (data) => {
    if (data) {
      // Attempt to delete the data
      pieRepo.delete(
        req.params.id,
        (data) => {
          res.status(200).json({
            status: 200,
            statusText: "Deleted",
            message: "Pie deleted.",
            data: data,
          });
        },
        (err) => {
          next(err);
        },
      );
    } else {
      res.status(404).json({
        status: 404,
        statusText: "Not Found",
        message: `The pie ${req.params.id} could not be found.`,
        error: {
          code: "NOT_FOUND",
          message: `The pie ${req.params.id} could not be found`,
        },
      });
    }
  });
});

// Configure router so all routes are prefixed with /api/
app.use("/api/", router);

// Create a server to listen on port 5000
const server = app.listen(5000, () => {
  console.log("Node server is running on http://localhost:5000...");
});
