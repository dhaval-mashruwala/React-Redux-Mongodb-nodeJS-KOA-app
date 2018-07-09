import mongoose , { Schema } from 'mongoose'

const ParentSchema = new mongoose.Schema({
  parent:{
    type:String
  },
  parentsCellPhone:{
    type:String
  },
  parentsEmail:{
    type:String
  },
  parentsName:{
    type:String
  }
  }, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    },
})

export default mongoose.model('Parent', ParentSchema)
