const express = require("express");
const router = express.Router();
const User = require("../models/Users");

// GET ALL USERS

router.get("/", async (req, res) => {
    try {
        const users = await User.find().select("-password"); // to hide the password from the response
        res.json(users);
    }

    catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//GET USER BY ID





//POST registration


router.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const newUser = new User({ firstName, lastName, email, password });
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//POST login

router.post("/login", async (req, res) => {
try{
    const { email, password } = req.body;
    const user = await User.findOne({ 
        email
     })

    if (!user)
        { return res.status(404).json({ message: "User not found" });
}

if (user.password !== password)  {
    return res.status(401).json({ message: "Invalid password" });
}
res.json(user);
}

catch (err) {
    res.status(500).json({ error: err.message });
}
}); 



// PUT con ID


//DELETE con ID


module.exports = router;