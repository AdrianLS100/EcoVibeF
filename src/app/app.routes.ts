import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { TransporteComponent } from './pages/actividades/transporte/transporte';
import { EnergiaComponent } from './pages/actividades/energia/energia';
import { ResiduoComponent } from './pages/actividades/residuo/residuo';
import { ResultadoComponent } from './pages/actividades/resultado/resultado';
import { CrearActividadComponent } from './pages/actividades/crear-actividad/crear-actividad';
import { CalculadoraPersonalComponent } from './pages/calculadora/calculadora-personal/calculadora-personal';
import {TiendaComponent} from './pages/tienda/tienda';
import {RecursosEducativosComponent} from './pages/recursos-educativos/recursos-educativos';
import {LoginComponent} from './pages/login/login';
import {RankingComponent} from './pages/ranking/ranking';
import {RegisterComponent} from './pages/register/register';
import {ResetPasswordComponent} from './pages/reset-password/reset-password';
import {ForgotPasswordComponent} from './pages/forgot-password/forgot-password';
import {NotificacionesPageComponent} from './pages/notificaciones/notificaciones';
import {ProfileComponent} from './pages/profile/profile';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'actividades/crear-actividad', component: CrearActividadComponent },
  { path: 'actividades/transporte', component: TransporteComponent },
  { path: 'actividades/energia', component: EnergiaComponent },
  { path: 'actividades/residuo', component: ResiduoComponent },
  { path: 'actividades/resultado', component: ResultadoComponent },
  { path: 'calculadora/calculadora-personal', component: CalculadoraPersonalComponent },
  { path: 'tienda', component: TiendaComponent },
  { path: 'recursoeducativo', component: RecursosEducativosComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'notificaciones', component: NotificacionesPageComponent },
  { path: 'perfil', component: ProfileComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '', component: LoginComponent, pathMatch: 'full'},
];
