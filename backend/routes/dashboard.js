const router = require("express").Router();
const { Op } = require("sequelize");

const Purchase = require("../models/Purchase");
const Transfer = require("../models/Transfer");
const Assignment = require("../models/Assignment");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let filter = {};

    // ✅ Date filter
    if (startDate && endDate) {
      filter.date = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    // ✅ Safe base (IMPORTANT)
    const base = req.user?.base || "HQ";

    /* ===========================
       SAFE CALCULATIONS
    =========================== */

    const purchases = await Purchase.sum("quantity", {
      where: filter
    }) || 0;

    const transferIn = await Transfer.sum("quantity", {
      where: {
        ...filter,
        toBase: base
      }
    }) || 0;

    const transferOut = await Transfer.sum("quantity", {
      where: {
        ...filter,
        fromBase: base
      }
    }) || 0;

    const assigned = await Assignment.sum("quantity", {
      where: filter
    }) || 0;

    /* ===========================
       FINAL CALCULATION
    =========================== */

    const net = purchases + transferIn - transferOut;
    const closing = net - assigned;

    res.json({
      opening: 0,
      closing,
      net,
      assigned,
      expended: assigned,
      purchases,
      transferIn,
      transferOut
    });

  } catch (err) {
    console.error("🔥 DASHBOARD ERROR:", err);
    res.status(500).json({ message: "Dashboard failed" });
  }
});

module.exports = router;