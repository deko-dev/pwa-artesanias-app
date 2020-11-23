import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ProductosComponent } from './components/productos/productos.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { ComprasComponent } from './components/compras/compras.component';

const routes: Routes = [
    { 
        path: '', 
        component: DashboardComponent, 
        children: [
            {
                path: '',
                component: PerfilComponent
            },
            {
                path: 'productos',
                component: ProductosComponent
            },
            {
                path: 'ventas',
                component: VentasComponent
            },
            {
                path: 'compras',
                component: ComprasComponent
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PerfilRoutingModule {}
