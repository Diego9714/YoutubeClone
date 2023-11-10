const { Router } = require("express")
const router = Router()
const _var = require("../global/_var.js")
const controller = require("../controllers/comment.controller.js")

// Comments
router.get(_var.ALL_COMMENTS, async (req, res) => {
  try {
    const data = { id_video } = req.params
    comment = await controller.getComment(data)
    console.log(comment)
    res.status(comment.code).json(comment)
  } catch (err) {
    res.status(500).json({ error: "Error al realizar la consulta" })
  }
})


// Create Comment
router.post(_var.COMMENT, async (req, res) => {
  try {
    const data = { id_video , id_user , content_comment } = req.body
    comment = await controller.regComment(data)
    res.status(comment.code).json(comment)
  } catch (err) {
    res.status(500).json({ error: "Error al realizar la consulta" })
  }
})

module.exports = router;