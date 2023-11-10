const { pool } = require("../models/postgre.connect.js")
const _var = require("../global/_var.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// ----- User statistics information -----
const getDataUser = async ({ data }) => {
  try {
    let msg = {
      status: false,
      message: "User not found",
      code: 404
    };

    let sqlReactions = `
      SELECT
        (SELECT COUNT(*) FROM reaction WHERE id_user = $1 AND type_reaction = 'like') AS like_count,
        (SELECT COUNT(*) FROM reaction WHERE id_user = $1 AND type_reaction = 'dislike') AS dislike_count;
    `;
    let reactionStats = await pool.query(sqlReactions, [id_user]);

    let sqlVideoVisits = `
      SELECT COUNT(*) AS video_visit_count
      FROM video_visits
      WHERE id_user = $1;
    `;
    let videoVisitStats = await pool.query(sqlVideoVisits, [id_user]);

    let sqlComments = `
      SELECT
        COUNT(*) AS comment_count,
        ARRAY_AGG(DISTINCT id_video) AS commented_videos
      FROM comment
      WHERE id_user = $1;
    `;
    let commentStats = await pool.query(sqlComments, [id_user]);

    if (reactionStats.rows.length > 0 || videoVisitStats.rows.length > 0 || commentStats.rows.length > 0) {
      msg = {
        status: true,
        message: "User found",
        data: {
          CantLikes: reactionStats.rows[0].like_count || 0,
          CantDislikes: reactionStats.rows[0].dislike_count || 0,
          CantVisitVideos: videoVisitStats.rows[0].video_visit_count || 0,
          CantComment: commentStats.rows[0].comment_count || 0,
        },
        code: 200
      };
    }

    return msg;
  } catch (error) {
    let msg = {
      status: false,
      message: "Something went wrong...",
      code: 500,
      error: error,
    };
    return msg;
  }
};

// ----- Login info -----
const getUser = async ({ data }) => {
  try {
    let msg = {
      status: false,
      message: "User not found",
      code: 200
    }

    let sql = `SELECT COUNT(id_user) FROM users WHERE email = '${email}';`
    let user = await pool.query(sql)

    if (user.rows[0].count == 1) {
      msg = {
        status: true,
        message: "User found",
        data: user.rows,
        code: 200
      }
    } else {
      msg = {
        status: false,
        message: "User not found",
        code: 404
      }
    }
    return msg
  } catch (error) {
    let msg = {
      status: false,
      message: "Something went wrong...",
      code: 500,
      error: err,
    }
    return msg
  }
};

// ----- Save User -----
const regUser = async ({ data }) => {
  try {
    let msg = {
      status: false,
      message: "User not registered",
      code: 500
    }
    
    const hash = await bcrypt.hash(password, 10)
    let sql = `INSERT INTO users (username , email , password ) VALUES ('${username}', '${email}', '${hash}');`
    const user = await pool.query(sql)
    if (user.rowCount > 0) {
      msg = {
        status: true,
        message: "User registered succesfully",
        code: 200
      }
    } else {
      msg = {
        status: false,
        message: "User not registered",
        code: 500
      }
    }
    return msg

  } catch (err) {
    let msg = {
      status: false,
      message: "Something went wrong...",
      code: 500,
      error: err,
    }
    return msg
  }
}

// ----- Verify User -----
const verifyUser = async ({data}) => {
  try {
    let msg = {
      status: false,
      message: "User not found",
      code: 200
    }
    
    let sql = `SELECT id_user , username , email , password FROM users WHERE email = '${email}';`
    let user = await pool.query(sql)

    let tokenInfo = {
      id_user: user.rows[0].id_user,
      username: user.rows[0].username,
      email: user.rows[0].email
    }

    if (user.rows.length > 0) {
      if (email === user.rows[0].email) {
        const match = await bcrypt.compare(password, user.rows[0].password) 
        
        const token = jwt.sign(tokenInfo, _var.KEY, { algorithm: "HS256" })

        if (match) {
          msg = {
            status: true,
            message: "Logged successfully",
            code: 200,
            data: user.rows[0].id_user,
            // data: token,
          }
        } else {
          msg = {
            status: false,
            message: "Incorrect password",
            code: 500
          }
        }
      } else {
        msg = {
          status: false,
          message: "Username not found, verify your email and password",
          code: 404
        }
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
  getDataUser,
  getUser,
  regUser,
  verifyUser
}
