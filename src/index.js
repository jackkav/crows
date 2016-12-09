import {app, router} from './bootstrap'
import Error from './model'
import logger from './winston'

const port = process.env.PORT || 3001

    // do logging
router.use(function(req, res, next) {
  console.log('Request: ', req.method, req.url)//, req.body)
  next() // make sure we go to the next routes and don't stop here
})
app.use('/api', router)

router.route('/errors')
.get(function(req, res, next) {
  Error.find()
  .select({_id: 0})
  .sort({ timestamp: -1 })
  .exec((err, errors) => {
    if (err) {
      res.send(err)
    }
    res.json(errors)
  })
})
// POST error
.post(function(req, res, next) {
  logger.log(req.body.level, req.body.message, req.body.stack)
  res.send('Success')
})

router.route('/errors/:distribution/:application')
// Get one show
.get(function(req, res, next) {
  const query = {'meta.application': req.params.application, 'meta.distribution': req.params.distribution}
  Error.find(query)
  .select({_id: 0})
  .sort({ timestamp: -1 })
  .exec((err, errors) => {
    if (err) {
      res.send(err)
    }
    res.json(errors)
  })
})

// index
app.get('/', function(req, res) {
  res.send('all at /api/errors/ | filter at /api/errors/env/app')
})

app.listen(port, function() {
  console.log('Express is listening to http://localhost:3001')
})
