import mongoose from 'mongoose'

const EmployeeSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    picture: String,
    salary: String,
    position: String,
  },
  // 언제 생성되고 언제 업데이트가 되었는지
  { timestamps: true }
)

const Employee = mongoose.model('employee', EmployeeSchema)

export { Employee, EmployeeSchema }
