require('dotenv').config()

/* ----------- SERVER ----------- */
const PORT                      = process.env.PORT

/* ----------- DATABASE ----------- */
const PG_HOST                   = process.env._HOST
const PG_USER                   = process.env._USER
const PG_PASS                   = process.env._PASS
const PG_NAME                   = process.env._NAME

/* ----------- ROUTES ----------- */

// Users
const UPLOAD_VIDEO              = process.env.UPLOAD_VIDEO
const VIEW_VIDEO                = process.env.VIEW_VIDEO
const ALL_VIDEOS                = process.env.ALL_VIDEOS


module.exports = {
	// Server
  PORT,
  // Database
  PG_HOST, PG_USER, PG_PASS, PG_NAME,
  // Users - Login
  UPLOAD_VIDEO, VIEW_VIDEO, ALL_VIDEOS
}
