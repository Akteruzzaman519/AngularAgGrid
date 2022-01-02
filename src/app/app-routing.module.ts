import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccComponent } from './acc/acc.component';
import { AccordionComponent } from './accordion/accordion.component';
import { AdnanComponent } from './adnan/adnan.component';
import { AkterComponent } from './akter/akter.component';
import { ComboComponent } from './combo/combo.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeesComponent } from './employees/employees.component';
import { FormValidationComponent } from './form-validation/form-validation.component';
import { FromCommonComponent } from './from-common/from-common.component';
import { HomeComponent } from './home/home.component';
import { IcsMenuComponent } from './ics-menu/ics-menu.component';
import { IcsTreeComponent } from './ics-tree/ics-tree.component';
import { LoginComponent } from './login/login.component';
import { MenuTreeComponent } from './menu-tree/menu-tree.component';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { NaimComponent } from './naim/naim.component';
import { RegisterComponent } from './register/register.component';
import { RituComponent } from './ritu/ritu.component';
import { SonetComponent } from './sonet/sonet.component';
import { StudentComponent } from './student/student.component';
import { TabComponent } from './tab/tab.component';
import { TreeComponent } from './tree/tree.component';
import { UIFeatureComponent } from './uifeature/uifeature.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'adnan', component: AdnanComponent },
  { path: 'ritu', component: RituComponent },
  { path: 'naim', component: NaimComponent },
  { path: 'akter', component: AkterComponent },
  { path: 'sonet', component: SonetComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'menu', component: MenuTreeComponent },
  { path: 'menuTree', component: IcsMenuComponent },
  { path: 'icsTree', component: IcsTreeComponent },

  {
    path: 'uiFeature', component: UIFeatureComponent,
    children: [
      { path: '', redirectTo: 'acc', pathMatch: 'full' },
      { path: 'acc', component: AccComponent },
      { path: 'fromValidation', component: FormValidationComponent },
      { path: 'fromCommon', component: FromCommonComponent },
      { path: 'tab', component: TabComponent },
      { path: 'menuTree', component: MenuTreeComponent },
      { path: 'combo', component: ComboComponent },
      { path: 'modalWindow', component: ModalWindowComponent },


    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'studentEntry', component: StudentComponent },
  { path: 'tree', component: TreeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
