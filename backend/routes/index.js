import express from "express";
import path from "path";

const router = express.Router();
const __dirname = path.resolve();

/* GET home page. */
router.get("/", function(req, res, next) {
    res.sendFile(path.resolve(__dirname, "../public/index.html"));
});

export default router;