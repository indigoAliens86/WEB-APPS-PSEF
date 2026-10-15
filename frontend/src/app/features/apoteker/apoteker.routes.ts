import { Routes } from '@angular/router';

export const apotekerRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./apoteker').then((m) => m.Apoteker),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'resep',
        loadComponent: () =>
          import('../fasilitas/resep/resep').then((m) => m.Resep),
        children: [
          {
            path: 'detail-resep/:id',
            loadComponent: () =>
              import('../fasilitas/resep/detail-resep/detail-resep').then(
                (m) => m.DetailResep
              ),
          },
          {
            path: 'detail-resep',
            loadComponent: () =>
              import('../fasilitas/resep/detail-resep/detail-resep').then(
                (m) => m.DetailResep
              ),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('../fasilitas/resep/detail-resep/detail-resep').then(
                (m) => m.DetailResep
              ),
          },
        ],
      },
      {
        path: 'telefarmasi',
        loadComponent: () =>
          import('../fasilitas/telefarmasi/telefarmasi').then((m) => m.Telefarmasi),
        children: [
          {
            path: 'detail-telefarmasi/:id',
            loadComponent: () =>
              import('../fasilitas/telefarmasi/detail-telefarmasi/detail-telefarmasi').then(
                (m) => m.DetailTelefarmasi
              ),
          },
          {
            path: 'detail-telefarmasi',
            loadComponent: () =>
              import('../fasilitas/telefarmasi/detail-telefarmasi/detail-telefarmasi').then(
                (m) => m.DetailTelefarmasi
              ),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('../fasilitas/telefarmasi/detail-telefarmasi/detail-telefarmasi').then(
                (m) => m.DetailTelefarmasi
              ),
          },
        ],
      },
      {
        path: 'pasien',
        loadComponent: () =>
          import('../fasilitas/pasien/pasien').then((m) => m.Pasien),
        children: [
          {
            path: 'detail-pasien/:id',
            loadComponent: () =>
              import('../fasilitas/pasien/detail-pasien/detail-pasien').then(
                (m) => m.DetailPasien
              ),
          },
          {
            path: 'detail-pasien',
            loadComponent: () =>
              import('../fasilitas/pasien/detail-pasien/detail-pasien').then(
                (m) => m.DetailPasien
              ),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('../fasilitas/pasien/detail-pasien/detail-pasien').then(
                (m) => m.DetailPasien
              ),
          },
        ],
      },
      {
        path: 'produk',
        loadComponent: () =>
          import('../fasilitas/produk/produk').then((m) => m.Produk),
      },
      {
        path: 'pesanan',
        loadComponent: () =>
          import('./pesanan/pesanan').then((m) => m.Pesanan),
        children: [
          {
            path: 'detail-pesanan/:id',
            loadComponent: () =>
              import('./pesanan/detail-pesanan/detail-pesanan').then(
                (m) => m.DetailPesanan
              ),
          },
          {
            path: 'detail-pesanan',
            loadComponent: () =>
              import('./pesanan/detail-pesanan/detail-pesanan').then(
                (m) => m.DetailPesanan
              ),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./pesanan/detail-pesanan/detail-pesanan').then(
                (m) => m.DetailPesanan
              ),
          },
        ],
      },
      {
        path: 'laporan',
        loadComponent: () =>
          import('../fasilitas/laporan/laporan').then((m) => m.Laporan),
        children: [
          {
            path: 'detail-laporan/:id',
            loadComponent: () =>
              import('../fasilitas/laporan/detail-laporan/detail-laporan').then(
                (m) => m.DetailLaporan
              ),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('../fasilitas/laporan/detail-laporan/detail-laporan').then(
                (m) => m.DetailLaporan
              ),
          },
        ],
      },
      {
        path: 'profil',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./profile/profile').then((m) => m.Profile),
          },
          {
            path: 'edit-profile',
            loadComponent: () =>
              import('./profile/edit-profile/edit-profile').then((m) => m.EditProfile),
          },
        ],
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./profile/profile').then((m) => m.Profile),
          },
          {
            path: 'edit-profile',
            loadComponent: () =>
              import('./profile/edit-profile/edit-profile').then((m) => m.EditProfile),
          },
        ],
      },
      {
        path: 'pengaturan',
        loadComponent: () =>
          import('./pengaturan/pengaturan').then((m) => m.Pengaturan),
      },
    ],
  },
];
