import mongoose , { Schema } from 'mongoose'

const StudentSchema = new mongoose.Schema({
  _id : String,
    studentId : {
      type: String,
      unique:true,
      index:true
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    email: {
        type: String
    },
    cellPhone:{
      type: String
    },
    address:{
      type:String
    },
    gender:{
      type:String
    },
    dateOfBirth:{
      type:Date
    },
    livingWithParents:{
      type:Boolean,
      default:false
    },
    dateOfJoining:{
      type:Date
    },
    isParent:{
      type:Boolean,
      default:false
    },
    parent:{type: String,
      ref: 'Parent'}
    ,
    class:[
      {type: String,
      ref: 'Progress'}
    ],
    finance:[
      {type: String,
      ref: 'Finance'}
    ]
  }, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    },
})

export default mongoose.model('Student', StudentSchema)
