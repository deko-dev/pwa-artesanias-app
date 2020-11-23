import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    { 
        path: '', 
        loadChildren: () => import('./pages/home/home.module')
            .then(m => m.HomeModule) 
    }, 
    { 
        path: 'home', 
        loadChildren: () => import('./pages/home/home.module')
            .then(m => m.HomeModule) 
    },
    { 
        path: 'login', 
        loadChildren: () => import('./pages/login/login.module')
            .then(m => m.LoginModule) ,
        canActivate: [AuthGuard]
    },
    { 
        path: 'registro', 
        loadChildren: () => import('./pages/registro/registro.module')
            .then(m => m.RegistroModule),
        canActivate: [AuthGuard]
    },
    { 
        path: 'perfil', 
        loadChildren: () => import('./pages/perfil/perfil.module')
            .then(m => m.PerfilModule) 
    },
    { 
        path: 'productos', 
        loadChildren: () => import('./pages/productos/productos.module')
            .then(m => m.ProductosModule) 
    },
    { 
        path: 'carrito', 
        loadChildren: () => import('./pages/carrito/carrito.module')
            .then(m => m.CarritoModule) 
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
