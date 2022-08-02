const jwt = require("jsonwebtoken");
const User = require("./model");

exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        const token = await jwt.sign({_id: newUser._id}, process.env.SECRET); //creaes token with user id inside
        //generate token using newUser_ID
        console.log(newUser);
        res.status(200).send({msg: "New user added", token }); //sendssuccess message and the token in the repsonse
    } catch (error) {
        console.log(error)
        res.status(500).send({ err: error });
    }
}; //create user works

exports.login = async (req, res) => {
    try {
        const token = await jwt.sign({_id: req.user._id}, process.env.SECRET); //creaes token with user id inside
        //generate token using newUser_ID      
        res.status(200).send({ user: req.user, token }); 
    } catch (error) {
        console.log(error);
        res.status(500).send({ err: error });
    }
}; //token check works

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        const result = users.map((u) => {
            return u.username;
        });
        res.status(200).send({ allUsers: result })
    } catch (error) {
        console.log(error);
        res.status(500).send({ err: error });
    }
};

//   exports.updateEmail = async (req, res) => {
//     try {
//       const newEmail = await User.findOneAndUpdate(
//         { username: req.body.username },
//         { $set: { email: req.body.email } }
//       );
//       res.status(200).send({ message: "Specified User Email Updated" });
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({ message: "Check server logs" });
//     }
//   };
  
//   exports.deleteUser = async (req, res) => {
//     try {
//       await User.findOneAndDelete({ username: req.body.username });
//       res
//         .status(200)
//         .send({ message: "Specified User Deleted from the DataBase" });
//     } catch (error) {
//       console.log(error);
//     }
//   };