const burger = require("..burger");
const express = require("express");

const router = express.Router();

router.get("/", function(req, res)
{
    burger.selectAll(function(data)
    {
        let hbsObject = {cats: data};
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function(req, res)
{
    burger.insertOne(
        ["name", "devoured"],
        [req.body.name, req.body.devoured],
        function(result)
        {
            res.json({id: result.insertId});
        });
});

router.put("/api/burgers/:id", function(req, res)
{
    let condition = `id = ${req.params.id}`;

    console.log("condition", condition);

    burger.updateOne({devoured: req.body.devoured}, condition, function(result)
    {
        if (result.changedRows === 0)
        {
            return res.status(404).end();
        }
    });
});

module.exports = router;