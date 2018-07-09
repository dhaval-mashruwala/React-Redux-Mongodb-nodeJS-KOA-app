import Student from '../../models/Student';
import Finance from '../../models/Finance';
import { error , success } from '../../lib/responseMessages'
export default (router) => {
  router.post('/student/finance/:studentId',getFinanceDetails())
}

function getFinanceDetails(){
  return async(ctx,next)=>{
    try{
      let {studentId} = ctx.params;
      let {from,to} = ctx.request.body;
      let studentRes = await Student.findById(studentId).populate('finance');
      let response = studentRes.finance.filter((item)=>{
        if(item.date>=new Date(from) && item.date<=new Date(to)){
          return item;
        }
      });
      return success(ctx , "",response);
    } catch(err){
      return error(ctx, err.toString())
    }
  }
}

function submitAttendance(){
  return async(ctx,next)=>{
    try{
      let {data} = ctx.request.body;
      data.map(async(attendanceItem)=>{
        let attendance = new Attendance(attendanceItem);
        let attendanceRes = await attendance.save();
      })
      return success(ctx , "Attendance submitted successfully!");
    } catch(err){
      return error(ctx, err.toString())
    }
  }
}
