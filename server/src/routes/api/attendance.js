import Student from '../../models/Student';
import Attendance from '../../models/Attendance';
import { error , success } from '../../lib/responseMessages'
export default (router) => {
  router.post('/student/attendance/:studentId',getAttendance())
  router.post('/student/attendance',submitAttendance())
}

function getAttendance(){
  return async(ctx,next)=>{
    try{
      let {studentId} = ctx.params;
      let {from,to} = ctx.request.body;
      let attendanceRes = await Attendance.find({student:studentId,date: { $gte: new Date(from), $lte: new Date(to)}}).populate('student');
      return success(ctx , "",attendanceRes);
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
        if(attendanceItem){
          attendanceItem.date = new Date(attendanceItem.date);
          attendanceItem.date.setHours(0);
          attendanceItem.date.setMinutes(0);
          attendanceItem.date.setSeconds(0);
          attendanceItem.date.setMilliseconds(0);
          let attendanceInfo = await Attendance.find({student:attendanceItem.student,date: new Date(attendanceItem.date)});
          console.log(attendanceInfo);
          if(attendanceInfo && attendanceInfo.length){
            attendanceInfo[0].present = attendanceItem.present;
            await attendanceInfo[0].save();
          } else {
            let attendance = new Attendance(attendanceItem);
            let attendanceRes = await attendance.save();
          }
        }
      })
      return success(ctx , "Attendance submitted successfully!");
    } catch(err){
      return error(ctx, err.toString())
    }
  }
}
