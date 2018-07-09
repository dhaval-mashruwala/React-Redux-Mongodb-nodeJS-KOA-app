import mongoose , { Schema } from 'mongoose'

const ProgressSchema = new mongoose.Schema({
  classEnrollment:{
    type:String
  },
  rank:{
    type:String
  },
  date:{
    type:Date,
    default:Date.now()
  }
  }, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    },
})

export default mongoose.model('Progress', ProgressSchema)
