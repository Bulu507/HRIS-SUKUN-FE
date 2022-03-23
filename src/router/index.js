import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import GantiPassword from '../views/GantiPassword.vue'

import Customer1 from '../views/MainData/Customer.vue'
import Admin from '../views/MainData/Admin.vue'
import AdminRole from '../views/MainData/AdminRole.vue'

import PendingTask from '../views/Task/PendingTask.vue'

import SysParam from '../views/Employee/SysParam.vue'
import Employee from '../views/Employee/Employee.vue'
import EmpDetail from '../views/Employee/EmpDetail.vue'
import EmpAddEdit from '../views/Employee/EmpAddEdit.vue'

import Loan from '../views/Payroll/Loan.vue'
import Reimbursement from '../views/Payroll/Reimbursement.vue'
import Salary from '../views/Payroll/Salary.vue'

import EmployeeAgrement from '../views/Utilities/EmployeeAgrement.vue'
import Announcement from '../views/Utilities/Announcement.vue'
import Letters from '../views/Utilities/Letters.vue'

import JobSeekerProfile from '../views/Recruitment/JobSeekerProfile.vue'
import OpenRecruitment from '../views/Recruitment/OpenRecruitment.vue'
import ScheduleRecruitment from '../views/Recruitment/ScheduleRecruitment.vue'
import ScheduleDetail from '../views/Recruitment/ScheduleRecruitmentDetail.vue'
import SelectionResult from '../views/Recruitment/SelectionResult.vue'

import DailyAttendance from '../views/TimeAttendance/DailyAttendance.vue'
import HistoryAttendace from '../views/TimeAttendance/HistoryAttendace.vue'
import EmployeePermit from '../views/TimeAttendance/EmployeePermit.vue'
import EmployeeOvertime from '../views/TimeAttendance/EmployeeOvertime.vue'

import HistoryTraining from '../views//Training/HistoryTraining.vue'
import TrainingRequest from '../views//Training/TrainingRequest.vue'
import TrainingOngoing from '../views//Training/TrainingOngoing.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },{
    path: '/Uploads',
    name: 'Login',
    component: Login
  },
  {
    path: '/GantiPassword',
    name: 'GantiPassword',
    component: GantiPassword
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  
  {
    path: '/Customer1',
    name: 'Customer1',
    component: Customer1
  },
  {
    path: '/Admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/AdminRole',
    name: 'AdminRole',
    component: AdminRole
  }, 
 
  {
    path: '/PendingTask',
    name: 'PendingTask',
    component: PendingTask
  },

  {
    path: '/SysParam',
    name: 'SysParam',
    component: SysParam
  },
  {
    path: '/Employee',
    name: 'Employee',
    component: Employee
  },
  {
    path: '/EmpDetail',
    name: 'EmpDetail',
    component: EmpDetail
  },
  {
    path: '/EmpAddEdit',
    name: 'EmpAddEdit',
    component: EmpAddEdit
  },

  {
    path: '/Loan',
    name: 'Loan',
    component: Loan
  },

  {
    path: '/Reimbursement',
    name: 'Reimbursement',
    component: Reimbursement
  },

  {
    path: '/Salary',
    name: 'Salary',
    component: Salary
  },

  {
    path: '/EmployeeAgrement',
    name: 'EmployeeAgrement',
    component: EmployeeAgrement
  },

  {
    path: '/Announcement',
    name: 'Announcement',
    component: Announcement
  },

  {
    path: '/Letters',
    name: 'Letters',
    component: Letters  
  },

  {
    path: '/JobSeekerProfile',
    name: 'JobSeekerProfile',
    component: JobSeekerProfile
  },

  {
    path: '/OpenRecruitment',
    name: 'OpenRecruitment',
    component: OpenRecruitment
  },
  
  {
    path: '/ScheduleRecruitment',
    name: 'ScheduleRecruitment',
    component: ScheduleRecruitment
  },
  {
    path: '/ScheduleDetail',
    name: 'ScheduleDetail',
    component: ScheduleDetail
  },
  
  {
    path: '/SelectionResult',
    name: 'SelectionResult',
    component: SelectionResult
  },

  {
    path: '/DailyAttendance',
    name: 'DailyAttendance',
    component: DailyAttendance
  },

  {
    path: '/HistoryAttendace',
    name: 'HistoryAttendace',
    component: HistoryAttendace
  },

  {
    path: '/EmployeePermit',
    name: 'EmployeePermit',
    component: EmployeePermit
  },

  {
    path: '/EmployeeOvertime',
    name: 'EmployeeOvertime',
    component: EmployeeOvertime
  },

  {
    path: '/HistoryTraining',
    name: 'HistoryTraining',
    component: HistoryTraining
  },

  {
    path: '/TrainingRequest',
    name: 'TrainingRequest',
    component: TrainingRequest
  },

  {
    path: '/TrainingOngoing',
    name: 'TrainingOngoing',
    component: TrainingOngoing
  },
]

const router = new VueRouter({
  routes
})

export default router
