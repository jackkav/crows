import mongoose from 'mongoose'
mongoose.Promise = global.Promise
mongoose.connect(process.env.DATABASE || 'mongodb://localhost/test')
const Error = mongoose.model('error', {
  application: String,
  environment: String,
  client: String,
  message: String,
  stack: String,
  addedOn: Date,
})
export default Error
