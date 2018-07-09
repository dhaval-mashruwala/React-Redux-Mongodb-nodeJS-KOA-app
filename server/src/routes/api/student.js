import {
  isEmailValid
} from '../../lib/auth'
import Student from '../../models/Student';
import Parent from '../../models/Parent';
import Class from '../../models/Class';
import Finance from '../../models/Finance';
import Attendance from '../../models/Attendance';
import { error , success } from '../../lib/responseMessages'
export default (router) => {
  router.post('/student',register())
  router.get('/student',getStudentList())
  router.put('/student',editStudent())
  router.delete('/student/:id',deleteStudent())
  router.get('/student/:id',getStudentListById())
  router.get('/student/class/:className',getStudentListByClass())
}

function register() {
  return async(ctx, next) => {
    try{
      const {
        studentPersonalDetails,
        studentParentDetails,
        studentFinancialDetails,
        studentAcademicDetails
      } = ctx.request.body;
      if (studentPersonalDetails && studentParentDetails && studentFinancialDetails && studentAcademicDetails) {
        let studentRes;
        let {
          firstName,
          lastName,
          studentId,
          email,
          cellPhone,
          address,
          dateOfBirth,
          dateOfJoining,
          gender,
          livingWithParents,
          isParent
        } = studentPersonalDetails;

        let {
          parentsCellPhone,
          parentsEmail,
          parentsName,
        } = studentParentDetails;

        let {costs} = studentFinancialDetails;
        let {classEnrollment,rank} = studentAcademicDetails;

        if(firstName && lastName && studentId){
          let student = new Student(
            {...studentPersonalDetails,_id:studentId}
          );

          if(student.livingWithParents){
            if(parentsName && parentsEmail && parentsCellPhone){
              let parent = new Parent({
                ...studentParentDetails
              });
              let parentRes = await parent.save();
              student.parent = parentRes._id;
            } else {
              return error(ctx, 'parentsName, parentsEmail,parentCellPhone are nessacary feild if living with parent!');
            }
          }


          if(costs && costs.length){
            student.finance = [];
          await Promise.all(costs.map(async(cost)=>{
              let studentFinance = new Finance({...cost});
              let financeRes = await studentFinance.save();
              student.finance.push(financeRes._id)
            }));

          }

          if(classEnrollment && rank){
              student.class = [];
              let studentClass = new Class({...studentAcademicDetails});
              let classRes = await studentClass.save();
              student.class.push(classRes._id);
          }
          console.log(student);
          let studentRes = await student.save();

          return success(ctx , "Student information registered" , studentRes)

        } else {
          return error(ctx, 'firstName, lastName, studentId are nessacary feild!');
        }
      } else {
        return error(ctx, 'Incorrect Request body!');
      }
    } catch(err){
      return error(ctx, err.toString())
    }
  }
}

function editStudent() {
  return async(ctx, next) => {
    try{
      let {
        studentPersonalDetails,
        studentParentDetails,
        studentFinancialDetails,
        studentAcademicDetails
      } = ctx.request.body;

      if (studentPersonalDetails) {
        let studentRes;
        let {
          studentId,
        } = studentPersonalDetails;

        if(studentId){
          let student =await Student.findById(studentId);
          student = Object.assign(student,studentPersonalDetails);
          if(studentParentDetails){
            console.log(student);
            let parent = await Parent.findById(student.parent);
            parent = Object.assign(parent,studentParentDetails);
            await parent.save();
          }
          if(studentFinancialDetails){
            let {costs} = studentFinancialDetails;
            if(costs && costs.length && student.finance.length == costs.length){
              student.finance.map(async(financeItem,index)=>{
                let studentFinance = await Finance.findById(financeItem);
                studentFinance = Object.assign(studentFinance,costs[index]);
                await studentFinance.save()
              })
            } else if(costs && student.finance.length > costs.length){
              let tempStudFinance=[...student.finance];
              await Promise.all(student.finance.map(async(financeItem,index)=>{
                if(costs[index]){
                  let studentFinance = await Finance.findById(financeItem);
                  studentFinance = Object.assign(studentFinance,costs[index]);
                  await studentFinance.save()
                } else {
                  let studentFinance = await Finance.findOneAndRemove(financeItem);
                  tempStudFinance.pop();
                }
              }))
              student.finance = tempStudFinance;
            } else if(costs && student.finance.length < costs.length){
              let tempStudFinance=[...student.finance];
              await Promise.all(costs.map(async(financeItem,index)=>{
                if(student.finance[index]){
                  let studentFinance = await Finance.findById(student.finance[index]);
                  studentFinance = Object.assign(studentFinance,financeItem);
                  await studentFinance.save()
                } else {
                  let studentFinance = new Finance(financeItem);
                  let studentFinanceRes = await studentFinance.save();
                  tempStudFinance.push(studentFinanceRes._id);
                }
              }))
              student.finance = tempStudFinance;
            }
          }
          if(studentAcademicDetails){
            let {classEnrollment,rank} = studentAcademicDetails;
            let studentClass = new Class({...studentAcademicDetails});
            let classRes = await studentClass.save();
            student.class.push(classRes._id);
          }
          await student.save();
          let response = await Student.findById(studentId).populate([
            {path:'parent'},
            {path:'finance'},
            {path:'class'}
          ]);
          console.log(response);
          return success(ctx , "Student information edited successfully!",response)

        } else {
          return error(ctx, 'studentId is nessacary feild!');
        }
      } else {
        return error(ctx, 'Incorrect Request body!');
      }
    } catch(err){
      return error(ctx, err.toString())
    }
  }
}

function getStudentList(){
  return async(ctx,next)=>{
    try{
      let studentsRes = await Student.find({}).populate([
        {path:'parent'},
        {path:'finance'},
        {path:'class'}
      ]);
      return success(ctx , "" , studentsRes);
    } catch(err){
      return error(ctx, err.toString())
    }
  }
}

function getStudentListByClass(){
  return async(ctx,next)=>{
    try{
      let {className} = ctx.params;
      let studentsRes = await Student.find({}).populate([
        {path:'parent'},
        {path:'finance'},
        {path:'class'}
      ]);
      studentsRes = studentsRes.filter((student)=>{
        if(student.class.length && student.class[student.class.length-1].classEnrollment == className){
          return student
        }
      });

      return success(ctx , "" , studentsRes);
    } catch(err){
      return error(ctx, err.toString())
    }
  }
}

function deleteStudent(){
  return async(ctx,next)=>{
    try{
      let {id} = ctx.params;
      let student = await Student.findById(id);
      await Parent.findOneAndRemove(student.parent);
      await Parent.findOneAndRemove(student.parent);
      student.class.map(async(classItem)=>{
        await Class.findOneAndRemove(classItem);
      })
      student.finance.map(async(financeItem)=>{
        await Finance.findOneAndRemove(financeItem);
      })
      await Attendance.remove({student:id});
      await student.remove();
      return success(ctx , "Student removed successfully!");
    } catch(err){
      return error(ctx, err.toString())
    }
  }
}
function getStudentListById(){
  return async(ctx,next)=>{
    try{
      let {id} = ctx.params;
      let student = await Student.findById(id).populate([
        {path:'parent'},
        {path:'finance'},
        {path:'class'}
      ]);
      return success(ctx , "", student);
    } catch(err){
      return error(ctx, err.toString())
    }
  }
}
