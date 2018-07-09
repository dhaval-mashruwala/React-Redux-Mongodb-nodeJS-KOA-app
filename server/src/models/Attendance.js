import mongoose , { Schema } from 'mongoose'

const AttendanceSchema = new mongoose.Schema({
  classEnrollment:{
    type:String
  },
  date:{
    type:Date
  },
  present:{
    type:Boolean,
    default:false
  },
  student:{
    type: String,
    ref: 'Student'
  }
  }, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    },
})

export default mongoose.model('Attendance', AttendanceSchema)
