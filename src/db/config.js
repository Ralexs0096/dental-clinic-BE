import { connect } from 'mongoose'

const dbConnection = async () => {
  try {
    await connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log('Database is Connected')
  } catch (e) {
    console.log(e)
    throw new Error('Error to connect BD')
  }
}

export default dbConnection
