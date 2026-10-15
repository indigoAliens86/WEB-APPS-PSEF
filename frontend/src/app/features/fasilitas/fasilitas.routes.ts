import { Routes } from '@angular/router';

export const fasilitasRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./fasilitas').then((m) => m.Fasilitas),
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
          import('./resep/resep').then((m) => m.Resep),
        children: [
          {
            path: 'detail-resep/:id',
            loadComponent: () =>
              import('./resep/detail-resep/detail-resep').then(
                (m) => m.DetailResep
              ),
          },
          {
            path: 'detail-resep',
            loadComponent: () =>
              import('./resep/detail-resep/detail-resep').then(
                (m) => m.DetailResep
              ),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./resep/detail-resep/detail-resep').then(
                (m) => m.DetailResep
              ),
          },
        ],
      },
      {
        path: 'telefarmasi',
        loadComponent: () =>
          import('./telefarmasi/telefarmasi').then((m) => m.Telefarmasi),
        children: [
          {
            path: 'detail-telefarmasi/:id',
            loadComponent: () =>
              import('./telefarmasi/detail-telefarmasi/detail-telefarmasi').then(
                (m) => m.DetailTelefarmasi
              ),
          },
          {
            path: 'detail-telefarmasi',
            loadComponent: () =>
              import('./telefarmasi/detail-telefarmasi/detail-telefarmasi').then(
                (m) => m.DetailTelefarmasi
              ),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./telefarmasi/detail-telefarmasi/detail-telefarmasi').then(
                (m) => m.DetailTelefarmasi
              ),
          },
        ],
      },
      {
        path: 'pasien',
        loadComponent: () =>
          import('./pasien/pasien').then((m) => m.Pasien),
        children: [
          {
            path: 'detail-pasien/:id',
            loadComponent: () =>
              import('./pasien/detail-pasien/detail-pasien').then(
                (m) => m.DetailPasien
              ),
          },
          {
            path: 'detail-pasien',
            loadComponent: () =>
              import('./pasien/detail-pasien/detail-pasien').then(
                (m) => m.DetailPasien
              ),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./pasien/detail-pasien/detail-pasien').then(
                (m) => m.DetailPasien
              ),
          },
        ],
      },
      {
        path: 'produk',
        loadComponent: () =>
          import('./produk/produk').then((m) => m.Produk),
        children: [
          {
            path: 'tambah-produk',
            loadComponent: () =>
              import('./produk/tambah-produk/tambah-produk').then((m) => m.TambahProduk),
          },
          {
            path: 'detail-produk/:id',
            loadComponent: () =>
              import('./produk/detail-produk/detail-produk').then((m) => m.DetailProduk),
          },
          {
            path: 'edit-produk/:id',
            loadComponent: () =>
              import('./produk/edit-produk/edit-produk').then((m) => m.EditProduk),
          },
        ],
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
        path: 'transaksi',
        loadComponent: () =>
          import('./transaksi/transaksi').then((m) => m.Transaksi),
        children: [
          {
            path: 'detail-transaksi/:id',
            loadComponent: () =>
              import('./transaksi/detail-transaksi/detail-transaksi').then(
                (m) => m.DetailTransaksi
              ),
          },
          {
            path: 'detail-transaksi',
            loadComponent: () =>
              import('./transaksi/detail-transaksi/detail-transaksi').then(
                (m) => m.DetailTransaksi
              ),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./transaksi/detail-transaksi/detail-transaksi').then(
                (m) => m.DetailTransaksi
              ),
          },
        ],
      },
      {
        path: 'apoteker',
        loadComponent: () =>
          import('./apoteker/apoteker').then((m) => m.Apoteker),
        children: [
          {
            path: 'tambah-apoteker',
            loadComponent: () =>
              import('./apoteker/tambah-apoteker/tambah-apoteker').then((m) => m.TambahApoteker),
          },
          {
            path: 'tambah',
            loadComponent: () =>
              import('./apoteker/tambah-apoteker/tambah-apoteker').then((m) => m.TambahApoteker),
          },
          {
            path: 'detail-apoteker/:id',
            loadComponent: () =>
              import('./apoteker/detail-apoteker/detail-apoteker').then((m) => m.DetailApoteker),
          },
          {
            path: 'detail-apoteker',
            loadComponent: () =>
              import('./apoteker/detail-apoteker/detail-apoteker').then((m) => m.DetailApoteker),
          },
          {
            path: 'edit-apoteker/:id',
            loadComponent: () =>
              import('./apoteker/edit-apoteker/edit-apoteker').then((m) => m.EditApoteker),
          },
          {
            path: 'edit-apoteker',
            loadComponent: () =>
              import('./apoteker/edit-apoteker/edit-apoteker').then((m) => m.EditApoteker),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./apoteker/detail-apoteker/detail-apoteker').then((m) => m.DetailApoteker),
          },
        ],
      },
      {
        path: 'promo',
        loadComponent: () =>
          import('./promo/promo').then((m) => m.Promo),
        children: [
          {
            path: 'tambah-promo',
            loadComponent: () =>
              import('./promo/tambah-promo/tambah-promo').then((m) => m.TambahPromo),
          },
          {
            path: 'tambah',
            loadComponent: () =>
              import('./promo/tambah-promo/tambah-promo').then((m) => m.TambahPromo),
          },
          {
            path: 'detail-promo/:id',
            loadComponent: () =>
              import('./promo/detail-promo/detail-promo').then((m) => m.DetailPromo),
          },
          {
            path: 'detail-promo',
            loadComponent: () =>
              import('./promo/detail-promo/detail-promo').then((m) => m.DetailPromo),
          },
          {
            path: 'edit-promo/:id',
            loadComponent: () =>
              import('./promo/edit-promo/edit-promo').then((m) => m.EditPromo),
          },
          {
            path: 'edit-promo',
            loadComponent: () =>
              import('./promo/edit-promo/edit-promo').then((m) => m.EditPromo),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./promo/detail-promo/detail-promo').then((m) => m.DetailPromo),
          },
        ],
      },
      {
        path: 'laporan',
        loadComponent: () =>
          import('./laporan/laporan').then((m) => m.Laporan),
        children: [
          {
            path: 'detail-laporan/:id',
            loadComponent: () =>
              import('./laporan/detail-laporan/detail-laporan').then(
                (m) => m.DetailLaporan
              ),
          },
          {
            path: 'detail-laporan',
            loadComponent: () =>
              import('./laporan/detail-laporan/detail-laporan').then(
                (m) => m.DetailLaporan
              ),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./laporan/detail-laporan/detail-laporan').then(
                (m) => m.DetailLaporan
              ),
          },
        ],
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./profile/profile').then((m) => m.Profile),
      },
      {
        path: 'profil',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
      {
        path: 'pengaturan',
        loadComponent: () =>
          import('./pengaturan/pengaturan').then((m) => m.Pengaturan),
      },
    ],
  },
];
