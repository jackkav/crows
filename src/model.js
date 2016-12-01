import mongoose from 'mongoose'
mongoose.Promise = global.Promise
mongoose.connect(process.env.DATABASE || 'mongodb://localhost/test')
const Error = mongoose.model('error', {
  source: String,
  environment: String,
  message: String,
  stack: String,
  addedOn: Date,
})
export default Error
