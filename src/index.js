import {app, router} from './bootstrap'
import Error from './model'
const port = process.env.PORT || 3000
router.use(function(req, res, next) {
    // do logging
  console.log('Request: ', req.method, req.url)
  next() // make sure we go to the next routes and don't stop here
})
app.use('/api', router)

router.route('/errors')
.get(function(req, res, next) {
  Error.find()
  .select({_id: 0, __v: 0}) // ignore wierd mongoose auto added stuff
  .sort({ addedOn: -1 })
  .exec((err, errors) => {
    if (err) {
      res.send(err)
    }
    res.json(errors)
  })
})
.post(function(req, res, next) {
  // console.log(req.body)
  const input = req.body
  input.addedOn = new Date()
  const oneError = new Error(input)
  oneError.save(function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log('recieved error from: ' + req.body.source)
      res.send('recieved error: ' + req.body.message)
    }
  })
})
// index
app.get('/', function(req, res) {
  res.send('Welcome to this logging API')
})

app.listen(port, function() {
  console.log('Express is listening to http://localhost:3000')
})
