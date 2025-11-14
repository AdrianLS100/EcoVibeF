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

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'actividades/crear-actividad', component: CrearActividadComponent },
  { path: 'actividades/transporte', component: TransporteComponent },
  { path: 'actividades/energia', component: EnergiaComponent },
  { path: 'actividades/residuo', component: ResiduoComponent },
  { path: 'actividades/resultado', component: ResultadoComponent },
  { path: 'calculadora/calculadora-personal', component: CalculadoraPersonalComponent },
  { path: 'tienda', component: TiendaComponent },
  { path: 'recursoeducativo', component: RecursosEducativosComponent },
  { path: '**', redirectTo: '/home' }
];
