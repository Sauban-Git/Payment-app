const { Router } = require("express");
const { User, Account, TransferHistory } = require("../db");
const {
  signupMiddleWare,
  signinMiddleWare,
  authMiddleWare,
} = require("../middleware/user");
const router = Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");


router.get("/", authMiddleWare, async (req, res) => {
  const userId = req.userId;
  const debited = await TransferHistory.find({ senderId: userId })
    .select("_id timestamp amount") // Keep _id, timestamp, and amount
    .populate("receiverId", "username firstName lastName"); // Populate receiver info

  const credited = await TransferHistory.find({
    receiverId: userId,
  })
    .select("_id timestamp amount") // Keep _id, timestamp, and amount
    .populate("senderId", "username firstName lastName"); // Populate sender info

  const accBalance = await Account.findOne({
    userId: userId,
  });
  const accInfo = await User.findOne({
    _id: userId,
  });
  res.json({
    username: accInfo.username,
    firstName: accInfo.firstName,
    lastName: accInfo.lastName,
    balance: accBalance.balance,
    id: accInfo._id,
    sent: debited,
    received: credited,
  });
});

router.post("/signup", signupMiddleWare, async (req, res) => {
  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
  });

  const userId = user._id.toString();
  const account = await Account.create({
    userId: userId,
    balance: 10000,
  });

  token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    JWT_SECRET,
    { expiresIn: "72h" }
  );
  res.json({
    msg: "Singned in!",
    token: token,
  });
});

router.post("/signin", signinMiddleWare, async (req, res) => {
  const user = req.customUser;
  token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    JWT_SECRET,
    { expiresIn: "72h" }
  );
  res.json({
    msg: "Singned in!",
    token: token,
  });
});

router.put("/change/:update", authMiddleWare, async (req, res) => {
  const userId = req.userId;
  const updateField = req.params.update;
  const updatedValue = req.body[updateField];
  const updateData = { [updateField]: updatedValue };
  const user = await User.updateOne(
    {
      _id: userId,
    },
    {
      $set: updateData,
    }
  );
  if (user.acknowledged) {
    res.json({
      msg: "Changed successfully",
    });
  } else {
    res.status(503).json({
      msg: "something went wrong",
    });
  }
});

// router.post("/users", authMiddleWare, async (req, res) => {
//   const username = req.body.username;
//   const user = await User.find(
//     {
//       $or: [
//         { username: { $regex: username, $options: "i" } },
//         { firstName: { $regex: username, $options: "i" } },
//         { lastName: { $regex: username, $options: "i" } },
//       ],
//     },
//     { firstName: 1, lastName: 1, _id: 1, username: 1 }
//   ).limit(3);
//   if (user) {
//     res.json(user);
//   } else {
//     res.status(504).json({
//       msg: "user not found!",
//     });
//   }
// });

router.post("/users", authMiddleWare, async (req, res) => {
  const username = req.body.username;
  const userId = req.userId;

  const users = await User.find(
    {
      $and: [
        { _id: { $ne: userId } },
        {
          $or: [
            { username: { $regex: username, $options: "i" } },
            { firstName: { $regex: username, $options: "i" } },
            { lastName: { $regex: username, $options: "i" } },
          ],
        },
      ],
    },
    { firstName: 1, lastName: 1, _id: 1, username: 1 }
  ).limit(3);

  if (users.length > 0) {
    res.json(users);
  } else {
    res.status(404).json({
      msg: "User not found!",
    });
  }
});

module.exports = router;
