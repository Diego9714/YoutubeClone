const { pool } = require("../models/postgre.connect.js")

// ----- Verification and registration of videos -----
const verifyVideo = async ({data}) => {
  try {
    let msg = {
      status: false,
      message: "User not found",
      code: 200
    }

    let sql = `SELECT COUNT(id_video) FROM video WHERE title_video = '${title_video}';`
    let video = await pool.query(sql)

    if (video.rows[0].count == 1) {
      msg = {
        status: true,
        message: "This video already exists",
        data: video.rows,
        code: 200
      }
    } else {
      msg = {
        status: false,
        message: "This video does not exist",
        code: 404
      }
    }
    return msg
  } catch (error) {
    return error
  }
};

const regVideo = async ({data}) => {
  try {
    let msg = {
      status: false,
      message: "User not registered",
      code: 500
    }
    
    let sql = `INSERT INTO video (title_video , url_video , score_video ) VALUES ('${title_video}', '${url_video}', '${0}' );`
    const video = await pool.query(sql)
    console.log(video.rowCount)
    if (video.rowCount > 0) {
      msg = {
        status: true,
        message: "Video registered succesfully",
        code: 200
      }
    } else {
      msg = {
        status: false,
        message: "Video not registered",
        code: 500
      }
    }
    return msg

  } catch (err) {
    let msg = {
      status: false,
      message: "Something went wrong...",
      code: 500,
      error: err
    }
    return msg
  }
}

// ----- Verification and registration of visits -----
const verifyVisit = async ({data}) => {
  try {
    let msg = {
      status: false,
      message: "User not found",
      code: 200
    }

    let sql = `SELECT COUNT(id_video) FROM video_visits WHERE id_user = '${id_user}';`
    let video = await pool.query(sql)

    if (video.rows[0].count == 1) {
      msg = {
        status: true,
        message: "Video already seen",
        data: video.rows,
        code: 200
      }
    } else {
      msg = {
        status: false,
        message: "Video not yet seen",
        code: 404
      }
    }
    return msg
  } catch (error) {
    return error
  }
};

const regVisit = async ({data}) => {
  try {
    let msg = {
      status: false,
      message: "Video not found",
      code: 200
    }
    
    let sql = `INSERT INTO video_visits (id_video , id_user) VALUES ('${id_video}', '${id_user}');`
    const video = await pool.query(sql)
    console.log(video.rowCount)
    if (video.rowCount > 0) {
      msg = {
        status: true,
        message: "Viewed successfully",
        code: 200
      }
    } else {
      msg = {
        status: false,
        message: "Seen unseen successfully",
        code: 500
      }
    }
    return msg

  } catch (err) {
    let msg = {
      status: false,
      message: "Something went wrong...",
      code: 500,
      error: err
    }
    return msg
  }
}

// ----- Random videos  -----
const getAllVideos = async () => {
  try {
    let sql  = `SELECT id_video, title_video, url_video
    FROM video
    ORDER BY RANDOM()
    LIMIT 10;
    `
    let video = await pool.query(sql)
    if (video.rows.length > 0) {
      msg = {
        status: true,
        message: "videos found Succesfully",
        data: video.rows,
        code: 200
      }
    }else{
      msg = {
        status: false,
        message: "videos not found",
        code: 200
      }
    } 
    return msg     
  } catch (err){
    let msg = {
      status: false,
      message: "Something went wrong...",
      code: 500,
      error: err
    }
    return msg
  }
}


module.exports = {
  verifyVideo,
  regVideo,
  verifyVisit,
  regVisit,
  getAllVideos
}