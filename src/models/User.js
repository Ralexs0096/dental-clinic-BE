import { model, Schema } from 'mongoose'

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    address: String,
    phone: Number,
    role: {
      type: String,
      default: 'user'
    }
  },
  {
    timestamps: {
      createdAt: 'created_at', // Use `created_at` to store the created date
      updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
  }
)

const user = new model('User', userSchema)
export default user
