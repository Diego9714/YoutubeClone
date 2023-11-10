require('dotenv').config()

/* ----------- SERVER ----------- */
const PORT                      = process.env.PORT

/* ----------- DATABASE ----------- */
const PG_HOST                   = process.env._HOST
const PG_USER                   = process.env._USER
const PG_PASS                   = process.env._PASS
const PG_NAME                   = process.env._NAME

/* ----------- ROUTES ----------- */

// Comments
const ALL_COMMENTS              = process.env.ALL_COMMENTS
const COMMENT                   = process.env.COMMENT

// Reactions
const ALL_REACTIONS              = process.env.ALL_REACTIONS
const VIEW_REACTIONS              = process.env.VIEW_REACTIONS
const REACTION                   = process.env.REACTION


module.exports = {
	// Server
  PORT,
  // Database
  PG_HOST, PG_USER, PG_PASS, PG_NAME,
  // Users - Login
  ALL_COMMENTS, COMMENT,
  // Reactions
  ALL_REACTIONS, VIEW_REACTIONS , REACTION
}
