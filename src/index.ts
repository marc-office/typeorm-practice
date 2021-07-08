import 'reflect-metadata'
import { createConnection } from 'typeorm'
import * as express from 'express'
import * as compression from 'compression'
// import * as cors from 'cors';
import * as morgan from 'morgan'
import 'dotenv/config'

import v1 from '@/router/v1/Index'

// Connect typeORM mysql
createConnection()
  .then(() => {
    console.log('Database Connected :)')
  })
  .catch((error) => console.log(error))

// Create express server
const app = express()

// middlewares
app.set('port', process.env.PORT || 3000)
app.use(compression())
app.use(express.urlencoded({ extended: true })) // express.urlencoded instead of bodyparser
app.use(express.json()) // To parse the incoming requests with JSON payloads
app.use(morgan('dev'))
// app.use(
//   cors({
//     origin: [`${process.env.TEST_IP}`],
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true,
//   }),
// );

// Routes
app.use('/v1', v1)

app.get('/', (req, res) => {
  res.send('hello')
})

export default app
