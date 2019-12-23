// Full Documentation - https://docs.turbo360.co
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const controllers = require('../controllers')
const router = vertex.router()

/* *
 * This is an example home route which renders the "home" 
 * template using the 'home.json' file from the pages 
 * folder to populate template data.
 */
router.get('/', (req, res) => {
	const data = req.context // {cdn:<STRING>, global:<OBJECT>}
	res.render('home', data) // render home.mustache	
})

/* *
 * This is an example route which renders various pages based 
 * on the 'req.params.page' parameter passed in the url
 */
router.get('/:page', (req, res) => {
	const data = req.context
	res.render(req.params.page, data)
})

/* *
 * This is a REST APT route which uses the models and 
 * controllers for resource and CRUD operations. 
 */
const APIRouter = vertex.APIRouter
const api = new APIRouter({
	site_id: process.env.TURBO_APP_ID,
	api_key: process.env.TURBO_API_KEY,
	env: process.env.TURBO_ENV
})

module.exports = {
    api: api.router(controllers),
    page: router
}
