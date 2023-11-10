const { Router } = require("express")
const router = Router()
const _var = require("../global/_var.js")
const controller = require("../controllers/video.controller.js")

// Comments
router.post(_var.COMMENT, async (req, res) => {
  try {
    const data = { id_video , title_video , url_video , img_video , id_user , content_comment } = req.body
    comment = await controller.regComment(data)
    res.status(comment.code).json(comment)
  } catch (err) {
    res.status(500).json({ error: "Error al realizar la consulta" })
  }
})



module.exports = router;
