const { pool } = require("../models/postgre.connect.js")

const verifyReaction = async ({ data }) => {
    try {
      let msg = {
        status: false,
        message: "Reaction not found",
        code: 404
      }
  
      let sql = `
        SELECT type_reaction 
        FROM reaction 
        WHERE id_video = '${id_video}' AND id_user = '${id_user}' AND type_reaction = '${type_reaction}';
      `;
  
      const reaction = await pool.query(sql);
  
      if (reaction.rows.length > 0) {
        sql = `DELETE FROM reaction WHERE id_video = '${id_video}' AND id_user = '${id_user}' AND type_reaction = '${type_reaction}';`;
        await pool.query(sql);
  
        if (type_reaction === 'dislike') {
          sql = `UPDATE video SET score_video = score_video + 5 WHERE id_video = '${id_video}';`;
        } else if (type_reaction === 'like') {
          sql = `UPDATE video SET score_video = score_video - 10 WHERE id_video = '${id_video}';`;
        }
  
        await pool.query(sql);
  
        msg = {
          status: true,
          message: "Reaction canceled and points deducted",
          code: 200
        };
      } else {
        msg = {
          status: false,
          message: "This video does not exist or the reaction is different",
          code: 404
        };
      }
  
      return msg;
    } catch (error) {
      return error;
    }
  };
  
  const regReaction = async ({ data }) => {
    try {
      let msg = {
        status: false,
        message: "Reaction not registered",
        code: 500
      }
  
      let sql = `INSERT INTO reaction (id_video, id_user, type_reaction) VALUES ('${id_video}', '${id_user}', '${type_reaction}');`
      const reaction = await pool.query(sql)
  
      if (reaction.rowCount > 0) {
        if (type_reaction === 'dislike') {
          sql = `UPDATE video SET score_video = score_video - 5 WHERE id_video = '${id_video}';`;
        } else if (type_reaction === 'like') {
          sql = `UPDATE video SET score_video = score_video + 10 WHERE id_video = '${id_video}';`;
        }
        await pool.query(sql);
  
        msg = {
          status: true,
          message: "Reaction registered successfully",
          code: 200
        }
      } else {
        msg = {
          status: false,
          message: "Reaction not registered",
          code: 500
        }
      }
      return msg;
    } catch (err) {
      let msg = {
        status: false,
        message: "Something went wrong...",
        code: 500,
        error: err
      }
      return msg;
    }
  };
  

module.exports = {
  verifyReaction,
  regReaction
}
