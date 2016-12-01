import {app, router} from './bootstrap'
const port = process.env.PORT || 3000
router.use(function(req, res, next) {
    // do logging
  console.log('Request: ', req.method, req.url)
  next() // make sure we go to the next routes and don't stop here
})
app.use('/api', router)

// index
app.get('/', function(req, res) {
  res.send('Hello world')
})

app.listen(port, function() {
  console.log('Express is listening to http://localhost:3000')
})
