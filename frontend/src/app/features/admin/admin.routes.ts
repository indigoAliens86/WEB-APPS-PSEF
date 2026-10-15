import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./admin')
            .then((m) => m.Admin),
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            },
            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./dashboard/dashboard')
                    .then((m) => m.Dashboard)
            },
            {
                path: 'fasilitas',
                loadComponent: () =>
                    import('./fasilitas/fasilitas')
                    .then((m) => m.Fasilitas),
                children: [
                    {
                        path: ':id',
                        loadComponent: () =>
                            import('./fasilitas/detail-fasilitas/detail-fasilitas')
                            .then((m) => m.DetailFasilitas),
                    },
                ],
            },
            {
                path: 'dokter',
                loadComponent: () =>
                    import('./dokter/dokter')
                    .then((m) => m.Dokter),
                children: [
                    {
                        path: 'tambah-dokter',
                        loadComponent: () =>
                            import('./dokter/add-dokter/add-dokter')
                            .then((m) => m.AddDokter),
                    },
                    {
                        path: 'tambah',
                        loadComponent: () =>
                            import('./dokter/add-dokter/add-dokter')
                            .then((m) => m.AddDokter),
                    },
                    {
                        path: 'edit-dokter/:id',
                        loadComponent: () =>
                            import('./dokter/edit-dokter/edit-dokter')
                            .then((m) => m.EditDokter),
                    },
                    {
                        path: 'edit/:id',
                        loadComponent: () =>
                            import('./dokter/edit-dokter/edit-dokter')
                            .then((m) => m.EditDokter),
                    },
                    {
                        path: 'edit-dokter',
                        loadComponent: () =>
                            import('./dokter/edit-dokter/edit-dokter')
                            .then((m) => m.EditDokter),
                    },
                    {
                        path: 'detail-dokter',
                        loadComponent: () =>
                            import('./dokter/detail-dokter/detail-dokter')
                            .then((m) => m.DetailDokter),
                    },
                    {
                        path: ':id',
                        loadComponent: () =>
                            import('./dokter/detail-dokter/detail-dokter')
                            .then((m) => m.DetailDokter),
                    },
                ],
            },
            {
                path: 'apoteker',
                loadComponent: () =>
                    import('./apoteker/apoteker')
                    .then((m) => m.Apoteker),
                children: [
                    {
                        path: 'tambah-apoteker',
                        loadComponent: () =>
                            import('./apoteker/add-apoteker/add-apoteker')
                            .then((m) => m.AddApoteker),
                    },
                    {
                        path: 'tambah',
                        loadComponent: () =>
                            import('./apoteker/add-apoteker/add-apoteker')
                            .then((m) => m.AddApoteker),
                    },
                    {
                        path: 'edit-apoteker/:id',
                        loadComponent: () =>
                            import('./apoteker/edit-apoteker/edit-apoteker')
                            .then((m) => m.EditApoteker),
                    },
                    {
                        path: 'edit/:id',
                        loadComponent: () =>
                            import('./apoteker/edit-apoteker/edit-apoteker')
                            .then((m) => m.EditApoteker),
                    },
                    {
                        path: 'edit-apoteker',
                        loadComponent: () =>
                            import('./apoteker/edit-apoteker/edit-apoteker')
                            .then((m) => m.EditApoteker),
                    },
                    {
                        path: 'detail-apoteker',
                        loadComponent: () =>
                            import('./apoteker/detail-apoteker/detail-apoteker')
                            .then((m) => m.DetailApoteker),
                    },
                    {
                        path: ':id',
                        loadComponent: () =>
                            import('./apoteker/detail-apoteker/detail-apoteker')
                            .then((m) => m.DetailApoteker),
                    },
                ],
            },
            {
                path: 'pasien',
                loadComponent: () =>
                    import('./pasien/pasien')
                    .then((m) => m.Pasien),
                children: [
                    {
                        path: 'tambah-pasien',
                        loadComponent: () =>
                            import('./pasien/add-pasien/add-pasien')
                            .then((m) => m.AddPasien),
                    },
                    {
                        path: 'tambah',
                        loadComponent: () =>
                            import('./pasien/add-pasien/add-pasien')
                            .then((m) => m.AddPasien),
                    },
                    {
                        path: 'edit-pasien/:id',
                        loadComponent: () =>
                            import('./pasien/edit-pasien/edit-pasien')
                            .then((m) => m.EditPasien),
                    },
                    {
                        path: 'edit/:id',
                        loadComponent: () =>
                            import('./pasien/edit-pasien/edit-pasien')
                            .then((m) => m.EditPasien),
                    },
                    {
                        path: 'edit-pasien',
                        loadComponent: () =>
                            import('./pasien/edit-pasien/edit-pasien')
                            .then((m) => m.EditPasien),
                    },
                    {
                        path: 'detail-pasien/:id',
                        loadComponent: () =>
                            import('./pasien/detail-pasien/detail-pasien')
                            .then((m) => m.DetailPasien),
                    },
                    {
                        path: 'detail-pasien',
                        loadComponent: () =>
                            import('./pasien/detail-pasien/detail-pasien')
                            .then((m) => m.DetailPasien),
                    },
                    {
                        path: ':id',
                        loadComponent: () =>
                            import('./pasien/detail-pasien/detail-pasien')
                            .then((m) => m.DetailPasien),
                    },
                ],
            },
            {
                path: 'telemedisin',
                loadComponent: () =>
                    import('./telemedisin/telemedisin')
                    .then((m) => m.Telemedisin),
                children: [
                    {
                        path: 'detail-telemedisin/:id',
                        loadComponent: () =>
                            import('./telemedisin/detail-telemedisin/detail-telemedisin')
                            .then((m) => m.DetailTelemedisin),
                    },
                    {
                        path: 'detail-telemedisin',
                        loadComponent: () =>
                            import('./telemedisin/detail-telemedisin/detail-telemedisin')
                            .then((m) => m.DetailTelemedisin),
                    },
                    {
                        path: ':id',
                        loadComponent: () =>
                            import('./telemedisin/detail-telemedisin/detail-telemedisin')
                            .then((m) => m.DetailTelemedisin),
                    },
                ],
            },
            {
                path: 'telefarmasi',
                loadComponent: () =>
                    import('./telefarmasi/telefarmasi')
                    .then((m) => m.Telefarmasi),
                children: [
                    {
                        path: 'detail-telefarmasi/:id',
                        loadComponent: () =>
                            import('./telefarmasi/detail-telefarmasi/detail-telefarmasi')
                            .then((m) => m.DetailTelefarmasi),
                    },
                    {
                        path: 'detail-telefarmasi',
                        loadComponent: () =>
                            import('./telefarmasi/detail-telefarmasi/detail-telefarmasi')
                            .then((m) => m.DetailTelefarmasi),
                    },
                    {
                        path: ':id',
                        loadComponent: () =>
                            import('./telefarmasi/detail-telefarmasi/detail-telefarmasi')
                            .then((m) => m.DetailTelefarmasi),
                    },
                ],
            },
            {
                path: 'pesanan',
                loadComponent: () =>
                    import('./pesanan/pesanan')
                    .then((m) => m.Pesanan),
                children: [
                    {
                        path: 'detail-pesanan/:id',
                        loadComponent: () =>
                            import('./pesanan/detail-pesanan/detail-pesanan')
                            .then((m) => m.DetailPesanan),
                    },
                    {
                        path: 'detail-pesanan',
                        loadComponent: () =>
                            import('./pesanan/detail-pesanan/detail-pesanan')
                            .then((m) => m.DetailPesanan),
                    },
                    {
                        path: ':id',
                        loadComponent: () =>
                            import('./pesanan/detail-pesanan/detail-pesanan')
                            .then((m) => m.DetailPesanan),
                    },
                ],
            },
            {
                path: 'transaksi',
                loadComponent: () =>
                    import('./transaksi/transaksi')
                    .then((m) => m.Transaksi),
                children: [
                    {
                        path: 'detail-transaksi/:id',
                        loadComponent: () =>
                            import('./transaksi/detail-transaksi/detail-transaksi')
                            .then((m) => m.DetailTransaksi),
                    },
                    {
                        path: 'detail-transaksi',
                        loadComponent: () =>
                            import('./transaksi/detail-transaksi/detail-transaksi')
                            .then((m) => m.DetailTransaksi),
                    },
                    {
                        path: ':id',
                        loadComponent: () =>
                            import('./transaksi/detail-transaksi/detail-transaksi')
                            .then((m) => m.DetailTransaksi),
                    },
                ],
            },
            {
                path: 'promo',
                loadComponent: () =>
                    import('./promo/promo')
                    .then((m) => m.Promo),
                children: [
                    {
                        path: 'detail-promo/:id',
                        loadComponent: () =>
                            import('./promo/detail-promo/detail-promo')
                            .then((m) => m.DetailPromo),
                    },
                    {
                        path: 'detail-promo',
                        loadComponent: () =>
                            import('./promo/detail-promo/detail-promo')
                            .then((m) => m.DetailPromo),
                    },
                    {
                        path: ':id',
                        loadComponent: () =>
                            import('./promo/detail-promo/detail-promo')
                            .then((m) => m.DetailPromo),
                    },
                ],
            },
            {
                path: 'point',
                loadComponent: () =>
                    import('./point/point')
                    .then((m) => m.Point),
                children: [
                    {
                        path: 'detail-point/:id',
                        loadComponent: () =>
                            import('./point/detail-point/detail-point')
                            .then((m) => m.DetailPoint),
                    },
                    {
                        path: 'detail-point',
                        loadComponent: () =>
                            import('./point/detail-point/detail-point')
                            .then((m) => m.DetailPoint),
                    },
                    {
                        path: ':id',
                        loadComponent: () =>
                            import('./point/detail-point/detail-point')
                            .then((m) => m.DetailPoint),
                    },
                ],
            },
            {
                path: 'konten',
                loadComponent: () =>
                    import('./konten/konten')
                    .then((m) => m.Konten),
                children: [
                    {
                        path: 'artikel/tambah',
                        loadComponent: () =>
                            import('./konten/artikel/tambah-artikel/tambah-artikel')
                            .then((m) => m.TambahArtikel),
                    },
                    {
                        path: 'tambah-artikel',
                        loadComponent: () =>
                            import('./konten/artikel/tambah-artikel/tambah-artikel')
                            .then((m) => m.TambahArtikel),
                    },
                    {
                        path: 'artikel/detail/:id',
                        loadComponent: () =>
                            import('./konten/artikel/detail-artikel/detail-artikel')
                            .then((m) => m.DetailArtikel),
                    },
                    {
                        path: 'detail-artikel/:id',
                        loadComponent: () =>
                            import('./konten/artikel/detail-artikel/detail-artikel')
                            .then((m) => m.DetailArtikel),
                    },
                    {
                        path: 'detail-artikel',
                        loadComponent: () =>
                            import('./konten/artikel/detail-artikel/detail-artikel')
                            .then((m) => m.DetailArtikel),
                    },
                    {
                        path: 'artikel/edit/:id',
                        loadComponent: () =>
                            import('./konten/artikel/edit-artikel/edit-artikel')
                            .then((m) => m.EditArtikel),
                    },
                    {
                        path: 'edit-artikel/:id',
                        loadComponent: () =>
                            import('./konten/artikel/edit-artikel/edit-artikel')
                            .then((m) => m.EditArtikel),
                    },
                    {
                        path: 'edit-artikel',
                        loadComponent: () =>
                            import('./konten/artikel/edit-artikel/edit-artikel')
                            .then((m) => m.EditArtikel),
                    },
                    {
                        path: 'banner/tambah',
                        loadComponent: () =>
                            import('./konten/banner/tambah-banner/tambah-banner')
                            .then((m) => m.TambahBanner),
                    },
                    {
                        path: 'tambah-banner',
                        loadComponent: () =>
                            import('./konten/banner/tambah-banner/tambah-banner')
                            .then((m) => m.TambahBanner),
                    },
                    {
                        path: 'banner/detail/:id',
                        loadComponent: () =>
                            import('./konten/banner/detail-banner/detail-banner')
                            .then((m) => m.DetailBanner),
                    },
                    {
                        path: 'detail-banner/:id',
                        loadComponent: () =>
                            import('./konten/banner/detail-banner/detail-banner')
                            .then((m) => m.DetailBanner),
                    },
                    {
                        path: 'detail-banner',
                        loadComponent: () =>
                            import('./konten/banner/detail-banner/detail-banner')
                            .then((m) => m.DetailBanner),
                    },
                    {
                        path: 'banner/edit/:id',
                        loadComponent: () =>
                            import('./konten/banner/edit-banner/edit-banner')
                            .then((m) => m.EditBanner),
                    },
                    {
                        path: 'edit-banner/:id',
                        loadComponent: () =>
                            import('./konten/banner/edit-banner/edit-banner')
                            .then((m) => m.EditBanner),
                    },
                    {
                        path: 'edit-banner',
                        loadComponent: () =>
                            import('./konten/banner/edit-banner/edit-banner')
                            .then((m) => m.EditBanner),
                    },
                ],
            },
            {
                path: 'laporan',
                loadComponent: () =>
                    import('./laporan/laporan')
                    .then((m) => m.Laporan),
                children: [
                    {
                        path: 'detail-laporan/:id',
                        loadComponent: () =>
                            import('./laporan/detail-laporan/detail-laporan')
                            .then((m) => m.DetailLaporan),
                    },
                    {
                        path: 'detail-laporan',
                        loadComponent: () =>
                            import('./laporan/detail-laporan/detail-laporan')
                            .then((m) => m.DetailLaporan),
                    },
                    {
                        path: ':id',
                        loadComponent: () =>
                            import('./laporan/detail-laporan/detail-laporan')
                            .then((m) => m.DetailLaporan),
                    },
                ],
            },
            {
                path: 'pengaturan',
                loadComponent: () =>
                    import('./pengaturan/pengaturan')
                    .then((m) => m.Pengaturan)
            },
        ]
    },
];
