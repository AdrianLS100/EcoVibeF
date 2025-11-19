import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { TransporteComponent } from './pages/actividades/transporte/transporte';
import { EnergiaComponent } from './pages/actividades/energia/energia';
import { ResiduoComponent } from './pages/actividades/residuo/residuo';
import { ResultadoComponent } from './pages/actividades/resultado/resultado';
import { CrearActividadComponent } from './pages/actividades/crear-actividad/crear-actividad';
import { CalculadoraPersonalComponent } from './pages/calculadora/calculadora-personal/calculadora-personal';
import { TiendaComponent } from './pages/tienda/tienda';
import { RecursosEducativosComponent } from './pages/recursos-educativos/recursos-educativos';
import { LoginComponent } from './pages/login/login';
import { RankingComponent } from './pages/ranking/ranking';
import { RegisterComponent } from './pages/register/register';
import { ResetPasswordComponent } from './pages/reset-password/reset-password';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password';
import { NotificacionesPageComponent } from './pages/notificaciones/notificaciones';
import { ProfileComponent } from './pages/profile/profile';
import { RegisterFamiliarComponent } from './pages/register-familiar/register-familiar';
import { RegisterTipoCuentaComponent } from './pages/register-tipo-cuenta/register-tipo-cuenta';

import { authGuard} from './security/auth-guard';
import {DashboardFamiliarComponent} from './pages/dashboard-familiar/dashboard-familiar';
import {RankingFamiliarComponent} from './pages/ranking/ranking-familiar/ranking-familiar';
import {RegisterInstitucionComponent} from './pages/register-institucion/register-institucion';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'dashboardfamiliar', component: DashboardFamiliarComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register-tipo', component: RegisterTipoCuentaComponent },
  { path: 'register-personal', component: RegisterComponent},
  { path: 'register-familiar', component: RegisterFamiliarComponent },
  { path: 'register-institucion', component: RegisterInstitucionComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },

  { path: 'actividades/crear-actividad', component: CrearActividadComponent, canActivate: [authGuard] },
  { path: 'actividades/transporte', component: TransporteComponent, canActivate: [authGuard] },
  { path: 'actividades/energia', component: EnergiaComponent, canActivate: [authGuard] },
  { path: 'actividades/residuo', component: ResiduoComponent, canActivate: [authGuard] },
  { path: 'actividades/resultado', component: ResultadoComponent, canActivate: [authGuard] },

  { path: 'calculadora-personal', component: CalculadoraPersonalComponent, canActivate: [authGuard] },

  { path: 'tienda', component: TiendaComponent, canActivate: [authGuard] },

  { path: 'recursos', component: RecursosEducativosComponent, canActivate: [authGuard] },

  { path: 'ranking', component: RankingComponent, canActivate: [authGuard] },
  { path: 'ranking-familiar', component: RankingFamiliarComponent, canActivate: [authGuard] },
  { path: 'notificaciones', component: NotificacionesPageComponent, canActivate: [authGuard] },

  { path: 'perfil', component: ProfileComponent, canActivate: [authGuard]},


  { path: '**', redirectTo: 'home' }
];
