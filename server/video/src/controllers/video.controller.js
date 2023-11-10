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
      message: "Video not yet seen",
      code: 200
    }
    
    let sql = `SELECT id_video FROM video_visits WHERE id_user = '${id_user}' AND id_video = '${id_video}';`
    let video = await pool.query(sql)

    if (video.rows.length > 0 && video.rows[0].id_video == id_video) {
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
    let msg = {
      status: false,
      message: "Something went wrong...",
      code: 500,
      error: error
    }
    return msg
  }
}

const regVisit = async ({data}) => {
  try {
    let msg = {
      status: false,
      message: "video not seen",
      code: 500
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
        message: "video not seen",
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

// ----- View Video  -----
const getVideo = async ({data}) => {
  try {

    let msg = {
      status: false,
      message: "Video not found",
      code: 404
    }

    let sql = `SELECT id_video, title_video, url_video FROM video WHERE id_video = $1;`;
    let video = await pool.query(sql, [id_video]);

    if (video.rows.length > 0) {
      msg = {
        status: true,
        message: "videos found Succesfully",
        code: 200,
        data: video.rows
      }
    }else{
      msg = {
        status: false,
        message: "video not found",
        code: 404
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


// ----- Random videos  -----
const getAllVideos = async () => {
  try {

    let msg = {
      status: false,
      message: "Videos not found",
      code: 500
    }

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
        code: 404
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

// ----- History of videos viewed by the user -----
const getHistory = async ({ data }) => {
  try {
    let msg = {
      status: false,
      message: "Videos not found",
      code: 500
    };

    let sql = `
      SELECT video.id_video, video.title_video, video.url_video , video_visits.date_visited 
      FROM video
      JOIN video_visits ON video_visits.id_video = video.id_video
      WHERE video_visits.id_user = $1
      ORDER BY video_visits.date_visited DESC
      LIMIT 10;
    `;

    let videos = await pool.query(sql, [id_user]);

    if (videos.rows.length > 0) {
      msg = {
        status: true,
        message: "Videos found successfully",
        data: videos.rows,
        code: 200
      };
    } else {
      msg = {
        status: false,
        message: "Videos not found",
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


const getPopular = async () => {
  try {
    let msg;

    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const formattedFirstDay = firstDayOfMonth.toISOString().split('T')[0];

    let sql = `
      WITH max_score AS (
        SELECT MAX(score_video) AS max_score
        FROM video
        WHERE date_created >= $1
      )

      SELECT id_video, title_video, url_video, score_video
      FROM video
      WHERE date_created >= $1
      ORDER BY
        CASE
          WHEN (SELECT max_score FROM max_score) > (SELECT MIN(score_video) FROM video WHERE date_created >= $1)
          THEN score_video
          ELSE random()
        END DESC
      LIMIT 5;
    `;

    const videos = await pool.query(sql, [formattedFirstDay]);

    if (videos.rows.length > 0) {
      msg = {
        status: true,
        message: "Videos found successfully",
        data: videos.rows,
        code: 200
      };
    } else {
      msg = {
        status: false,
        message: "No videos found for the current month",
        code: 200
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

// Points for day
const getPoints = async () => {
  try {
    let msg = {
      status: false,
      message: "Videos not found",
      code: 404
    };

    // Actualizar score_video en la tabla video sumando 100 puntos
    let sqlUpdate = `UPDATE video SET score_video = score_video + 100 RETURNING *;`;
    let updatedVideos = await pool.query(sqlUpdate);

    if (updatedVideos.rows.length > 0) {
      msg = {
        status: true,
        message: "All videos updated successfully, 100 points added to score_video",
        data: updatedVideos.rows,
        code: 200
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




module.exports = {
  verifyVideo,
  regVideo,
  getVideo,
  verifyVisit,
  regVisit,
  getAllVideos,
  getHistory,
  getPopular,
  getPoints
}