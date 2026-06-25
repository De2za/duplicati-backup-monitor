import { Routes } from '@angular/router';
import { ServerDetail } from './components/detail/detail';


export const routes: Routes = [
  {
    path: 'server/:id',
    component: ServerDetail
  }
];