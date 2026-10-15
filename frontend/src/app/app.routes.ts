import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'admin', pathMatch: 'full'},
    {path: 'admin',
        loadChildren: () =>
            import('./features/admin/admin.routes')
            .then((m) => m.adminRoutes)
    },
    {path: 'fasilitas',
        loadChildren: () =>
            import('./features/fasilitas/fasilitas.routes')
            .then((m) => m.fasilitasRoutes)
    },
    {path: 'apoteker',
        loadChildren: () =>
            import('./features/apoteker/apoteker.routes')
            .then((m) => m.apotekerRoutes)
    }
];

