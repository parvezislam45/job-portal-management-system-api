const { Router } = require("express");
const express = require("express");
const router = express.Router();
const jobController = require("../controllers/job.controller");
const authorization = require("../middleware/authorization");
const verifyToken = require("../middleware/verifyToken");


router
  .route("/jobs")
  .get(jobController.getAllJobs)
  .post(
    verifyToken,
    authorization("Admin", "Hiring-Manager"),
    jobController.createJob
  );

router
  .route("/manager/jobs")
  .get(
    verifyToken,
    authorization("Admin", "Hiring-Manager"),
    jobController.getJobsByManagerToken
  );

router
  .route("/manager/jobs/:id")
  .get(
    verifyToken,
    authorization("Admin", "Hiring-Manager"),
    jobController.getJobByManagerTokenJobId
  );

router
  .route("/jobs/:id")
  .get(jobController.getJobById)
  .patch(
    verifyToken,
    authorization("Admin", "Hiring-Manager"),
    jobController.updateJob
  );

router.route("/jobs/:id/apply").post(verifyToken, authorization("Candidate"), jobController.applyJob);

module.exports = router; 
