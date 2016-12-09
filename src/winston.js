import winston from 'winston'
import { Papertrail } from 'winston-papertrail'
import { Loggly } from 'winston-loggly'
import { MongoDB } from 'winston-mongodb'
const logger = new winston.Logger({
  transports: [
    new Papertrail({
      host: 'logs4.papertrailapp.com',
      port: 22498,
    }),
    new Loggly({
      token: '71f7c7ab-d859-4f11-a84a-693423f0ee90',
      subdomain: 'ihealthcn',
      tags: ['woodpecker'],
      json: true,
    }),
    new (winston.transports.Console)({
      colorize: true,
      prettyPrint: true,
    }),
    new MongoDB({
      handleExceptions: true,
      db: process.env.DATABASE || 'mongodb://localhost/test',
      // port: 27071,
      collection: 'log',
      errorTimeout: 10000,
      timeout: 50000
    })
  ],
  exceptionHandlers: [
    new Papertrail({
      host: 'logs4.papertrailapp.com',
      port: 22498,
    }),
    new Loggly({
      token: '71f7c7ab-d859-4f11-a84a-693423f0ee90',
      subdomain: 'ihealthcn',
      tags: ['woodpecker'],
      json: true,
    }),
    new (winston.transports.Console)({
      colorize: true,
      prettyPrint: true,
    }),
  ],
})

export default logger
