import mongoose from 'mongoose'
mongoose.Promise = global.Promise
mongoose.connect(process.env.DATABASE || 'mongodb://localhost/test')
const Error = mongoose.model('log', new mongoose.Schema(), 'log')
export default Error
