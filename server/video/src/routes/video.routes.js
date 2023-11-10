const { Router } = require("express")
const router = Router()
const _var = require("../global/_var.js")
const controller = require("../controllers/video.controller.js")

// Upload Video
router.post(_var.UPLOAD_VIDEO, async (req, res) => {
  try {
    const data = { title_video , url_video } = req.body

    let video = await controller.verifyVideo(data)

    if(video.code === 200){
      res
        .status(500)
        .json({ message: "This video already registered", status: false })
    }else if(video.code === 404){

      let videoReg = await controller.regVideo(data)
      
      res.status(videoReg.code).json(videoReg)
    }

  } catch (err) {
    res.status(500).json({ error: "Error al realizar la consulta" })
  }
})

// Visits of a user to a video
router.post(_var.VISIT_VIDEO, async (req, res) => {
  try {
    const data = { id_video , id_user } = req.params
    let video = await controller.verifyVisit(data)

    if(video.code === 200){
      res
        .status(500)
        .json({ message: "This video has already been viewed", status: false })
    }else if(video.code === 404){
      let videoReg = await controller.regVisit(data)
      res.status(videoReg.code).json(videoReg)
    }

  } catch (err) {
    res.status(500).json({ error: "Error al realizar la consulta" })
  }
})

// Random videos for the home page
router.get(_var.ALL_VIDEOS, async (req, res) => {
  try {
    const videos  = await controller.getAllVideos()
    res.status(videos.code).json(videos)
  } catch (err) {
    res.status(500).json({ error: "Error al realizar la consulta" })
  }
})

module.exports = router;