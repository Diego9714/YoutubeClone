const { pool } = require("../models/postgre.connect.js")

const verifyVideo = async ({data}) => {
  try {
    let msg = {
      status: false,
      message: "User not found",
      code: 404
    }

    let sql = `SELECT COUNT(id_video) FROM video WHERE id_video = '${id_video}';`
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
    
    let sql = `INSERT INTO video ( id_user , title_video , url_video , img_video , score_video ) VALUES ('${id_user}', '${title_video}', '${url_video}', '${img_video}' , '${0}' );`
    const video = await pool.query(sql)
    
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

const getVideo = async ({data}) => {
  try {
    let msg = {
      status: false,
      message: "Video not found",
      code: 200
    }
    
    let sql = 'SELECT title_video , url_video FROM video WHERE title_video = $1;'
    let video = await pool.query(sql, [title_video])

    if (video.rows.length > 0) {

      let data = {
        title_video: video.rows[0].title_video,
        url_video: video.rows[0].url_video
      } 
      
      msg = {
        status: true,
        message: "Video found successfully",
        code: 200 ,
        info:data
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

const regComment = async ({data}) => {
  try {
    let msg = {
      status: false,
      message: "User not registered",
      code: 500
    }
    
    let sql = `INSERT INTO comment ( id_video , id_user , content_comment ) VALUES ('${id_video}', '${id_user}', '${content_comment}' );`
    const video = await pool.query(sql)
    
    if (video.rowCount > 0) {

      sql = `UPDATE video SET score_video = score_video + 1 WHERE id_user = ${id_user} AND title_video = '${title_video}';`;
      await pool.query(sql);

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


// const getAllVideos = async () => {
//   try {
//     let sql  = `SELECT id_video , title_video FROM video;`
//     let video = await pool.query(sql)
//     if (video.rows.length > 0) {
//       msg = {
//         status: true,
//         message: "videos found Succesfully",
//         data: video.rows,
//         code: 200
//       }
//     }else{
//       msg = {
//         status: false,
//         message: "videos not found",
//         code: 200
//       }
//     } 
//     return msg     
//   } catch (err){
//     let msg = {
//       status: false,
//       message: "Something went wrong...",
//       code: 500,
//       error: err
//     }
//     return msg
//   }
// }


module.exports = {
  verifyVideo,
  regVideo,
  regComment,
  getVideo
}
