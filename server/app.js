import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import { Employee } from './model/Employee.js'
import dotenv from 'dotenv'
const { ObjectId } = mongoose.Types

const app = express()
app.use(bodyParser.json())

dotenv.config()

mongoose.connect(process.env.MONGO_URI)

mongoose.connection.on('connected', () => {
  console.log('Connected to mongoDB Yeahhhh')
})

mongoose.connection.on('error', (err) => {
  console.log('error', err)
})

app.get('/', (req, res) => {
  res.send('Welcome node js')
})

app.post('/send-data', (req, res) => {
  const { name, email, phone, picture, salary, position } = req.body
  const employee = new Employee({
    name: name,
    email: email,
    phone: phone,
    picture: picture,
    salary: salary,
    position: position,
  })
  employee
    .save()
    .then((data) => {
      console.log(data)
      res.send(data)
    })
    .catch((err) => {
      console.log(err)
    })
})

app.post('/delete', async (req, res) => {
  const { id } = req.body.id
  if (!ObjectId.isValid(req.body.id))
    res.status(400).send({ err: 'invalid marketId' })
  const employee = await Employee.findOneAndDelete(id)

  return res.send({ employee })
})

app.listen(5000, () => {
  console.log('Server is Running !!')
})
