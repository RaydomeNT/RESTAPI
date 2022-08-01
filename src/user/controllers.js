const User = require("./model");

exports.createUser = async (req, res) => {
    try {
        // console.log(req.body);
        const newUser = await User.create(req.body)
        console.log(newUser);
        res.send({msg: "this is from create user"}) 
    } catch (error) {
        console.log(error)
        res.send({ err: error });
    }
};