const { pool } = require("../models/postgre.connect.js")

const getCantReact = async ({ data }) => {
  try {
    let msg = {
      status: false,
      message: "Reactions not found",
      code: 404
    }

    let sql = `
      SELECT COUNT(id_reaction) AS likeCount
      FROM reaction
      WHERE id_video = $1 AND type_reaction = 'like';
    `;
    let like = await pool.query(sql, [id_video]);

    let sql2 = `
      SELECT COUNT(id_reaction) AS dislikeCount
      FROM reaction
      WHERE id_video = $1 AND type_reaction = 'dislike';
    `;
    let dislike = await pool.query(sql2, [id_video]);

    if (like.rows.length > 0 || dislike.rows.length > 0) {
      msg = {
        status: true,
        message: "Reactions found successfully",
        code: 200,
        data: {
          likes: like.rows[0].likecount || 0,
          dislikes: dislike.rows[0].dislikecount || 0
        }
      };
    }

    return msg;
  } catch (err) {
    let msg = {
      status: false,
      message: "Something went wrong...",
      code: 500,
      error: err
    };
    return msg;
  }
};
;


const getReaction = async ({ data }) => {
  try {
    let msg = {
      status: false,
      message: "Reactions not found",
      code: 404
    };

    let sql = `
      SELECT reaction.id_reaction, reaction.id_video, reaction.id_user, users.username, reaction.type_reaction
      FROM reaction
      JOIN users ON reaction.id_user = users.id_user
      WHERE reaction.id_video = $1;
    `;

    let reactions = await pool.query(sql, [id_video]);

    if (reactions.rows.length > 0) {
      msg = {
        status: true,
        message: "Reactions found successfully",
        code: 200,
        data: reactions.rows
      };
    } else {
      msg = {
        status: false,
        message: "Reactions not found",
        code: 404
      };
    }

    return msg;
  } catch (err) {
    let msg = {
      status: false,
      message: "Something went wrong...",
      code: 500,
      error: err
    };
    return msg;
  }
};

const verifyReaction = async ({ data }) => {
  try {
    let msg = {
      status: false,
      message: "Reaction not processed",
      code: 500
    };

    let sql = `
      SELECT type_reaction 
      FROM reaction 
      WHERE id_video = $1 AND id_user = $2;
    `;

    const existingReaction = await pool.query(sql, [id_video, id_user]);

    if (existingReaction.rows.length > 0) {
      const existingType = existingReaction.rows[0].type_reaction
      
      if (existingType == type_reaction) {
      console.log("Misma reaccion")
      sql = `DELETE FROM reaction WHERE id_video = $1 AND id_user = $2;`;
      await pool.query(sql, [id_video, id_user]);
        
        if (type_reaction == 'dislike') {
          sql = `UPDATE video SET score_video = score_video + 5 WHERE id_video = $1;`;
        } else if (type_reaction === 'like') {
          sql = `UPDATE video SET score_video = score_video - 10 WHERE id_video = $1;`;
        }

        await pool.query(sql, [id_video]);

        msg = {
          status: true,
          message: "Reaction canceled and points deducted",
          code: 200
        };

      } else if(existingType !== type_reaction){

        sql = `DELETE FROM reaction WHERE id_video = $1 AND id_user = $2;`;
        await pool.query(sql, [id_video, id_user]);

        if (type_reaction == 'dislike') {
          sql = `UPDATE video SET score_video = score_video - 10 WHERE id_video = $1;`;
        } else if (type_reaction == 'like') {
          sql = `UPDATE video SET score_video = score_video + 5  WHERE id_video = $1;`;
        }

        msg = {
          status: true,
          message: "Different reaction detected, points deducted",
          code: 404
        };

        await pool.query(sql, [id_video]);
      }
    } else {
      msg = {
        status: false,
        message: "No existing reaction found",
        code: 404
      }
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

    console.log(reaction.rowCount)

    if (reaction.rowCount > 0) {
      if (type_reaction == 'dislike') {
        sql = `UPDATE video SET score_video = score_video - 5 WHERE id_video = '${id_video}';`;
      } else if (type_reaction == 'like') {
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
}
  

module.exports = {
  getCantReact,
  getReaction,
  verifyReaction,
  regReaction
}
