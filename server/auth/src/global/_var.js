require('dotenv').config()

/* ----------- SERVER ----------- */
const PORT                      = process.env.PORT

/* ----------- DATABASE ----------- */
const PG_HOST                   = process.env._HOST
const PG_USER                   = process.env._USER
const PG_PASS               = process.env._PASS
const PG_NAME                   = process.env._NAME

/* ----------- ROUTES ----------- */

// Users
const ROOT                      = process.env.ROOT
const STATS                      = process.env.STATS

const KEY                      = process.env.KEY
const REGISTER                  = process.env.REGISTER
const LOGIN                     = process.env.LOGIN

module.exports = {
	// Server
  PORT,
  // Database
  PG_HOST, PG_USER, PG_PASS, PG_NAME,
  // Users - Login
  ROOT, REGISTER, LOGIN , KEY , STATS
 }
