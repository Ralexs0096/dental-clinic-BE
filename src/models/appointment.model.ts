import { getModelForClass, prop, Ref, modelOptions } from '@typegoose/typegoose'
import { User } from './user.model'

@modelOptions({
  schemaOptions: {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
})
export class Appointment {
  @prop({ required: true })
  public title!: string

  @prop({ ref: () => User, required: true })
  public user!: Ref<User>

  @prop({ required: true })
  public description!: string

  @prop({ required: true })
  public startTime!: Date

  @prop({ required: true })
  public endTime!: Date

  @prop({ default: 'pending' })
  public status!: string

  @prop()
  public observations?: string

  @prop({ ref: () => User, required: true })
  public createdBy!: Ref<User>
}

export const AppointmentModel = getModelForClass(Appointment)
