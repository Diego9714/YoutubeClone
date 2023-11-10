const { pool } = require("../models/postgre.connect.js")

const getComment = async () => {
  try {
    let sql  = `SELECT id_comment , content_comment FROM comment WHERE id_video = '${id_video}';`
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

      sql = `UPDATE video SET score_video = score_video + 1 WHERE id_video = '${id_video}';`;
      await pool.query(sql);

      msg = {
        status: true,
        message: "Comment registered succesfully",
        code: 200
      }
    } else {
      msg = {
        status: false,
        message: "Comment not registered",
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

module.exports = {
  getComment,
  regComment
}
