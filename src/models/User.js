import { model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: {
      type: String,
      select: false
    },
    address: String,
    phone: Number,
    role: {
      type: String,
      default: 'user'
    },
    reset_password_token: {
      type: String
    },
    reset_password_expires: {
      type: Date
    }
  },
  {
    timestamps: {
      createdAt: 'created_at', // Use `created_at` to store the created date
      updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
  }
)

userSchema.methods.encryptPassword = async password => {
  const salt = await bcrypt.genSalt()
  return bcrypt.hashSync(password, parseInt(salt))
}

userSchema.methods.validatePassword = function (password) {
  const isValid = bcrypt.compare(password, this.password)
  return isValid
}

const user = new model('User', userSchema)
export default user
