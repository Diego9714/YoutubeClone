const { pool } = require("../models/postgre.connect.js")
const _var = require("../global/_var.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

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
      email: user.rows[0].email,
      password: password
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
  getUser,
  regUser,
  verifyUser
}
