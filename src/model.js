import mongoose from 'mongoose'
mongoose.Promise = global.Promise
mongoose.connect(process.env.DATABASE || 'mongodb://localhost/test')
const Error = mongoose.model('error', {
  application: String,  // 爱健康医生端
  environment: String,  // staging
  client: String,       // iOS,username,bundleVersion
  message: String,      // Error in main.js
  stack: String,        // Error stack
  addedOn: Date,        // datetime of error
})
export default Error
