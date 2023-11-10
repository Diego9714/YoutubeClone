const { pool } = require("../models/postgre.connect.js")

const verifyComment = async ({data}) => {
  try {
    let msg = {
      status: false,
      message: "User not found",
      code: 404
    }

    let sql = `SELECT COUNT(id_comment) FROM comment WHERE id_comment = '${id_comment}';`
    let video = await pool.query(sql)

    if (video.rows[0].count == 1) {
      msg = {
        status: true,
        message: "This comment already exists",
        data: video.rows,
        code: 200
      }
    } else {
      msg = {
        status: false,
        message: "This comment does not exist",
        code: 404
      }
    }
    return msg
  } catch (error) {
    return error
  }
};

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
  verifyComment,
  regComment,
  regAnswer
}
