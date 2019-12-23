// Full Documentation - https://docs.turbo360.co
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const path = require('path')
const controllers = require('./controllers')

const config = {
	views: 'views', 	// Set views directory
	static: 'public',   // Set static assets directory
	logging: true,
	controllers: controllers,
	db: vertex.nedbConfig((process.env.TURBO_ENV=='dev') ? 'nedb://'+path.join(__dirname, process.env.TMP_DIR) : 'nedb://'+process.env.TMP_DIR)
}

const app = vertex.app(config) // initialize app with config options

// order matters here:
app.use(vertex.fetchGlobal(process.env.TURBO_API_KEY, process.env.TURBO_ENV, turbo)) // fetch global config on every route
app.use(vertex.setContext(process.env))

// import route files
const sample = require('./routes/sample') // sample routes for pages and REST API

// set routes
app.use('/', sample.page)
app.use('/api', sample.api)

module.exports = app
