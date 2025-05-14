const { Router } = require("express");
const { authMiddleWare } = require("../middleware/user");
const { Account, User, TransferHistory } = require("../db");
const { default: mongoose } = require("mongoose");
const router = Router();

router.get("/balance", authMiddleWare, async (req, res) => {
  const senderData = await Account.findOne({
    userId: req.userId,
  });
  res.json({
    balance: senderData.balance,
  });
});


router.post("/transfer", authMiddleWare, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const recieverId = req.body.toAccount;
  const userId = req.userId;
  const amount = req.body.amount;
  try {
    const senderData = await Account.findOne({
      userId: userId,
    }).session(session);

    const receiverData = await Account.findOne({
      userId: recieverId,
    }).session(session);

    if (!amount || amount > senderData.balance) {
      await session.abortTransaction();
      return res.status(400).json({
        msg: "Insufficient balance.",
      });
    }
    if (!receiverData) {
      await session.abortTransaction();
      return res.status(400).json({
        msg: "Reciever account doesnt exist.",
      });
    }

    const logii = await Account.updateOne(
      {
        userId: receiverData.userId,
      },
      {
        $inc: {
          balance: amount,
        },
      }
    ).session(session);

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

    await TransferHistory.create({
      senderId: userId,
      receiverId: receiverData.userId,
      amount: amount,
    })

    await session.commitTransaction();
    res.json({
      success: true,
    });
  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({
      success: false,
    });
  }
});

module.exports = router;
