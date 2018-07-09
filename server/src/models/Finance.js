import mongoose , { Schema } from 'mongoose'

const FinanceSchema = new mongoose.Schema({
  item:{
    type:String
  },
  itemCost:{
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

export default mongoose.model('Finance', FinanceSchema)
