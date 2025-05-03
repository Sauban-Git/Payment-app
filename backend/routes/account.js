const { Router } = require("express");
const { authMiddleWare } = require("../middleware/user");
const { Account, User } = require("../db");
const { default: mongoose } = require("mongoose");
const router = Router();

router.get("/balance", authMiddleWare, async (req, res) => {
  console.log("Hello from account///");
  const senderData = await Account.findOne({
    userId: req.userId,
  });
  console.log(senderData.balance);
  res.json({
    balance: senderData.balance,
  });
});

router.post("/transfer", authMiddleWare, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const recieverId = req.body.toAccount;
  console.log(recieverId);
  const userId = req.userId;
  const amount = req.body.amount;
  try {
    const senderData = await Account.findOne({
      userId: userId,
    }).session(session);

    const recieverData = await Account.findOne({
      userId: recieverId,
    }).session(session);

    if (!amount || amount > senderData.balance) {
      await session.abortTransaction();
      return res.status(400).json({
        msg: "Insufficient balance.",
      });
    }
    if (!recieverData) {
      console.log(recieverData);
      await session.abortTransaction();
      return res.status(400).json({
        msg: "Reciever account doesnt exist.",
      });
    }

    console.log("recieve: "+recieverData+"----------------")
    const logii = await Account.updateOne(
      {
        userId: recieverData.userId,
      },
      {
        $inc: {
          balance: amount,
        },
      }
    ).session(session);
    console.log(logii)

    await Account.updateOne(
      {
        userId: userId,
      },
      {
        $inc: {
          balance: -amount,
        },
      }
    ).session(session);
    await session.commitTransaction();
    res.json({
      success: true,
    });
  } catch (err) {
    await session.abortTransaction();
    console.log(err);
    res.status(500).json({
      success: false,
    });
  }
});

module.exports = router;
