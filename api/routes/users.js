const router = require("express").Router();
const Users = require("../models/User");

router.post("/", async (req, res) => {
  try {
    if (
      req.body.phoneNo.length !== 10 ||
      req.body.phoneNo.match(/^[0-9]+$/) == null ||
      !req.body.email.includes("@")
    ) {
      return res.status(400).json("Invalid data");
    } else {
      const newUser = await new Users({
        name: req.body.name,
        email: req.body.email,
        phoneNo: req.body.phoneNo,
      });
      var hobby = "";
      req.body.hobbies.trim();
      for (let i = 0; i < req.body.hobbies.length; i++) {
        if (req.body.hobbies[i] !== ",") {
          hobby += req.body.hobbies[i];
        }
        if (req.body.hobbies[i] === ",") {
          await newUser.hobbies.push(hobby);
          hobby = "";
        }
      }
      await newUser.save();
      res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

//get all users
router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
});

//update a specific user
router.put("/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (user) {
      var hobby = user.hobbies;
      var h = "";
      req.body.hobbies.trim();
      req.body.hobbies += ",";
      for (let i = 0; i < req.body.hobbies.length; i++) {
        if (req.body.hobbies[i] !== ",") {
          h += req.body.hobbies[i];
        } else if (req.body.hobbies[i] === ",") {
          if (hobby.includes(h)) {
            h = "";
            continue;
          } else {
            hobby.push(h);
            h = "";
          }
        }
      }
      await user.updateOne({
        email: req.body.email,
        phoneNo: req.body.phoneNo,
        name: req.body.name,
        $set: { hobbies: hobby },
      });
      res.status(200).json(user);
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

//delete a user
router.delete("/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (user) {
      await user.remove();
      res.status(200).json("User deleted");
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
