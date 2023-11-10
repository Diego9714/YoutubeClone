const { Router } = require("express")
const router = Router()
const _var = require("../global/_var.js")
const controller = require("../controllers/auth.controller.js")

router.get(_var.ROOT, (req, res) => {
  res.send("Hello World")
});

// ----- Statistics -----
router.get(_var.STATS, async (req, res) => {
  try {
    const data = { id_user } = req.params
    const user  = await controller.getDataUser(data)
    res.status(user.code).json(user)
  } catch (err) {
    res.status(500).json({ error: "Error al realizar la consulta" })
  }
});

// ----- Register -----
router.post(_var.REGISTER, async (req, res) => {
  try {
    const data = { username, email, password } = req.body
    let user = await controller.getUser(data)

    if (user.code == 200)
      res
        .status(500)
        .json({ message: "User already registered", status: false })
    else if (user.code == 404) {
      userReg = await controller.regUser(data)
      res.status(userReg.code).json(userReg)
    }
  } catch (err) {
    res.status(500).json({ error: "Error al realizar la consulta" })
  }
})

// ----- Login -----
router.post(_var.LOGIN, async (req, res) => {
  try {
    const data = { email, password } = req.body
    const user  = await controller.verifyUser(data)
    res.status(user.code).json(user)
  } catch (err) {
    res.status(500).json({ error: "Error al realizar la consulta" })
  }
})


module.exports = router;
