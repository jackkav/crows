import mongoose from 'mongoose'
mongoose.Promise = global.Promise
mongoose.connect(process.env.DATABASE || 'mongodb://localhost/test')
const Error = mongoose.model('error', {
  application: String,  // gtzh, patient, doctor, doctor-assistant
  distribution: String,  // staging
  client: String,       // iOS,username,bundleVersion
  message: String,      // Error in main.js
  stack: Object,        // Error stack
  when: Date,           // datetime of error
  hospital: String,     // 北大医院
  priority: String,     // crash, unhandled, handled
  severity: String,     // warning, error
  origin: String,       // client, server
})
export default Error
