import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    res.send("this is the home page!!");
    res.setHeader();
});

export default router;