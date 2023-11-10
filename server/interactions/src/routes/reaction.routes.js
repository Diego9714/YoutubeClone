const { Router } = require("express")
const router = Router()
const _var = require("../global/_var.js")
const controller = require("../controllers/reaction.controller.js")

// Reactions for Video
// router.get(_var.ALL_COMMENTS, async (req, res) => {
//   try {
//     const data = { id_video } = req.params
//     comment = await controller.getComment(data)
//     console.log(comment)
//     res.status(comment.code).json(comment)
//   } catch (err) {
//     res.status(500).json({ error: "Error al realizar la consulta" })
//   }
// })


// Create Reaction
router.post(_var.REACTION, async (req, res) => {
  try {
    const data = { id_video , id_user , type_reaction } = req.body

    console.log(data)
    let reaction = await controller.verifyReaction(data)

    if(reaction.code === 200){

      res
        .status(500)
        .json({ message: "This reaction already registered", status: false })

    }else if(reaction.code === 404){

      let reactionReg = await controller.regReaction(data)
      
      res.status(reactionReg.code).json(reactionReg)
    }

  } catch (err) {
    res.status(500).json({ error: "Error al realizar la consulta" })
  }
})

module.exports = router;