const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all requests for donor (filter by urgency optional)
router.get("/requests", (req, res) => {
  const urgency = req.query.urgency;

  let sql = "SELECT * FROM requests WHERE status='open'";
  let params = [];

  if (urgency) {
    sql += " AND urgency=?";
    params.push(urgency);
  }

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Accept / Reject request
router.post("/respond", (req, res) => {
  const { request_id, donor_id, response } = req.body;

  db.query(
    "INSERT INTO request_responses(request_id, donor_id, response) VALUES (?,?,?)",
    [request_id, donor_id, response],
    err => {
      if (err) return res.status(500).json(err);

      if (response === "accepted") {
        db.query(
          "UPDATE requests SET status='accepted' WHERE id=?",
          [request_id]
        );
      }

      res.json({ status: "success" });
    }
  );
});

module.exports = router;
