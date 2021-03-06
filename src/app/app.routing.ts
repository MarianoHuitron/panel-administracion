import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProductosComponent } from './components/productos/productos.component';
import { AuthGuard } from './guards/auth.guard';
import { AccessLoginGuard } from './guards/access-login.guard';
import { NuevoProductoComponent } from './components/nuevo-producto/nuevo-producto.component';
import { EditarComponent } from './components/editar/editar.component';

const app_routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [AccessLoginGuard] },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'productos', component: ProductosComponent, canActivate: [AuthGuard] },
    { path: 'productos/nuevo', component: NuevoProductoComponent, canActivate: [AuthGuard] },
    { path: 'productos/editar/:id', component: EditarComponent, canActivate: [AuthGuard] },
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: '**', pathMatch: 'full', redirectTo: '' }
];

export const APP_ROUTING = RouterModule.forRoot(app_routes);