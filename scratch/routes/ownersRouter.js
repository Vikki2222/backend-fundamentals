const express = require("express");
const router = express.Router();
let ownerModel = require("../models/owner-model");

router.get("/", async (req, res) => {
  res.send("Everything just fine");
});

// DEV routes
if (process.env.NODE_ENV == "development") {
    router.post("/create", (req, res) => {

        let { fullname, email, password, contact } = req.body;
      
        ownerModel.find()
          .then((owners) => {
      
            if (owners.length > 0) {
              return res.send({
                response: "Their can be only 1 owner",
              });
            }
      
            return ownerModel.create({
              fullname,
              email,
              password,
              contact,
            });
      
          })
          .then((createdOwner) => {
            if (createdOwner) {
              return res.send(createdOwner);
            }
          })
          .catch((err) => {
            res.send(err.message);
          });
      
      });      
}

router.get("/admin", async (req, res) => {
  let success = req.flash("success") ;
    res.render('createproducts',{success});
  });


module.exports = router;