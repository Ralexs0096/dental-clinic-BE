import { getModelForClass, prop, modelOptions, pre } from '@typegoose/typegoose'
import bcrypt from 'bcrypt'

@pre<User>('save', async function () {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, parseInt(salt))
  }
})
@modelOptions({
  schemaOptions: {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
})
export class User {
  @prop()
  public firstName!: string

  @prop()
  public lastName!: string

  @prop({ unique: true, required: true })
  public email!: string

  @prop({ required: true, select: false })
  public password!: string

  @prop()
  public address?: string

  @prop()
  public phone?: number

  @prop({ default: 'user' })
  public role!: string

  @prop()
  public reset_password_token?: string

  @prop()
  public reset_password_expires?: Date

  public async validatePassword(
    this: User,
    password: string
  ): Promise<boolean> {
    return bcrypt.compare(password, this.password)
  }
}

export const UserModel = getModelForClass(User)
