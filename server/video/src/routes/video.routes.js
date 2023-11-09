const { Router } = require("express")
const router = Router()
const _var = require("../global/_var.js")
const controller = require("../controllers/video.controller.js")

// Subir Video
router.post(_var.UPLOAD_VIDEO, async (req, res) => {
  try {
    const data = { id_user , title_video , url_video } = req.body
    let video = await controller.verifyVideo(data)

    if (video.status)
      res
        .status(500)
        .json({ message: "This video already registered", status: false })
    else if (!video.status) {
      videoReg = await controller.regVideo(data)
      res.status(videoReg.code).json(videoReg)
    }
  } catch (err) {
    res.status(500).json({ error: "Error al realizar la consulta" })
  }
})

// Ver video
router.get(_var.VIEW_VIDEO, async (req, res) => {
  try {
    const data = { title_video } = req.params
    let video = await controller.verifyVideo(data)

    if (video.data){
      viewVideo = await controller.getVideo(data)
      res.status(viewVideo.code).json(viewVideo)
    }
    else if (!video.status)
      res
        .status(500)
        .json({ message: "This video not exists", status: false })

  } catch (err) {
    res.status(500).json({ error: "Error al realizar la consulta" })
  }
})

// Lista de todos los videos
router.get(_var.ALL_VIDEOS, async (req, res) => {
  try {
    const videos  = await controller.getAllVideos()
    res.status(videos.code).json(videos)
  } catch (err) {
    res.status(500).json({ error: "Error al realizar la consulta" })
  }
})

module.exports = router;
