import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pengaturan } from './pengaturan';

describe('Pengaturan', () => {
  let component: Pengaturan;
  let fixture: ComponentFixture<Pengaturan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pengaturan],
    }).compileComponents();

    fixture = TestBed.createComponent(Pengaturan);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should switch between service and product settings', () => {
    component.selectTab('layanan');
    expect(component.activeTab()).toBe('layanan');

    component.selectService('Telefarmasi');
    expect(component.selectedService()).toBe('Telefarmasi');

    component.selectTab('produk');
    component.selectedProductSection.set('Kategori Produk');
    expect(component.activeTab()).toBe('produk');
    expect(component.getSelectedProductDescription()).toContain('Pengelompokan produk');
  });

  it('should show availability settings for telemedicine and telefarmasi', () => {
    component.selectTab('layanan');
    component.activeServiceTab.set('Jadwal dan Ketersediaan');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Jadwal Operasional');
    expect(component.isScheduledService()).toBe(true);

    component.selectService('Telefarmasi');
    expect(component.isScheduledService()).toBe(true);
  });

  it('should render each service settings panel for telemedicine and telefarmasi', () => {
    component.selectTab('layanan');

    for (const service of ['Telemedicine', 'Telefarmasi']) {
      component.selectService(service);

      component.activeServiceTab.set('Biaya dan Pembayaran');
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toContain('Komponen Biaya');
      expect(fixture.nativeElement.textContent).toContain(service);

      component.activeServiceTab.set('Fitur');
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toContain(`Fitur ${service}`);
      expect(fixture.nativeElement.textContent).toContain('Rekomendasi Fitur');

      component.activeServiceTab.set('Notifikasi');
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toContain('Pengaturan Notifikasi');
      expect(fixture.nativeElement.textContent).toContain('Preview Notifikasi');

      component.activeServiceTab.set('SLA dan Batasan');
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toContain(`Target SLA ${service}`);
      expect(fixture.nativeElement.textContent).toContain('Batas Layanan');
    }
  });

  it('should add a category from the category modal', () => {
    component.selectTab('produk');
    component.openAddCategory();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Tambah Kategori');

    component.categoryDraft = {
      code: 'KAT-011',
      name: 'Produk Kesehatan',
      slug: 'PK',
      description: 'Kategori produk kesehatan.',
      status: 'Aktif',
    };
    component.submitCategory();

    expect(component.categories()[0].code).toBe('KAT-011');
    expect(component.categories()[0].createdBy).toBe('Admin PSEF');
    expect(component.categories()[0].updatedAt).toMatch(/^\d{2}-\d{2}-\d{4}, \d{2}:\d{2} WIB$/);
    expect(component.productModal()).toBe('closed');
  });

  it('should edit and delete categories using separate modals', () => {
    component.selectTab('produk');
    const category = component.categories()[0];
    component.openEditCategory(category);
    component.categoryDraft.name = 'Obat Bebas Updated';
    component.submitCategory();

    expect(component.categories()[0].name).toBe('Obat Bebas Updated');

    component.openDeleteCategory(category.code);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Hapus Kategori');
    expect(component.deletingCategoryName).toBe('Obat Bebas Updated');
    component.deleteCategory();

    expect(component.categories().some((item) => item.code === category.code)).toBe(false);
    expect(component.productModal()).toBe('closed');
  });

  it('should reject duplicate category codes and keep the form open', () => {
    component.openAddCategory();
    component.categoryDraft = {
      code: 'KAT-001',
      name: 'Kategori Duplikat',
      slug: 'KD',
      description: '',
      status: 'Aktif',
    };
    component.submitCategory();

    expect(component.categoryFormError()).toContain('sudah digunakan');
    expect(component.productModal()).toBe('form');
    expect(component.categories()).toHaveLength(10);
  });

  it('should render the drug class list and open its add modal', () => {
    component.selectTab('produk');
    component.selectedProductSection.set('Golongan Obat');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Daftar Golongan Obat');
    for (const column of ['Kode', 'Nama Golongan', 'Simbol', 'Butuh Resep', 'Peringatan', 'Penandaan Kemasan', 'Dibuat oleh', 'Tanggal Update', 'Status', 'Aksi']) {
      expect(fixture.nativeElement.textContent).toContain(column);
    }
    expect(fixture.nativeElement.textContent).toContain('Obat Keras');

    component.openAddDrugClass();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Tambah Golongan Obat');
    expect(component.drugClassModal()).toBe('form');
  });

  it('should add, edit, and delete a drug class through its modal actions', () => {
    component.selectTab('produk');
    component.openAddDrugClass();
    component.drugClassDraft = {
      code: 'GOL-006',
      name: 'Obat Khusus',
      symbol: 'Segitiga kuning',
      prescriptionRequired: true,
      warning: 'Gunakan sesuai petunjuk.',
      packagingMark: 'Label khusus',
      status: 'Aktif',
    };
    component.submitDrugClass();
    expect(component.drugClasses()[0].code).toBe('GOL-006');

    component.openEditDrugClass(component.drugClasses()[0]);
    component.drugClassDraft.name = 'Obat Khusus Terbatas';
    component.submitDrugClass();
    expect(component.drugClasses()[0].name).toBe('Obat Khusus Terbatas');

    component.openDeleteDrugClass('GOL-006');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Hapus Golongan Obat');
    expect(component.deletingDrugClassName).toBe('Obat Khusus Terbatas');
    component.deleteDrugClass();
    expect(component.drugClasses().some((item) => item.code === 'GOL-006')).toBe(false);
    expect(component.drugClassModal()).toBe('closed');
  });

  it('should reject duplicate drug class codes', () => {
    component.openAddDrugClass();
    component.drugClassDraft = {
      code: 'GOL-001',
      name: 'Duplikat',
      symbol: 'Lingkaran hijau',
      prescriptionRequired: false,
      warning: '',
      packagingMark: '',
      status: 'Aktif',
    };
    component.submitDrugClass();
    expect(component.drugClassFormError()).toContain('sudah digunakan');
    expect(component.drugClassModal()).toBe('form');
    expect(component.drugClasses()).toHaveLength(5);
  });

  it('should render the pharmacology category table with ATC codes', () => {
    component.selectTab('produk');
    component.selectedProductSection.set('Kategori Farmakologi');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Daftar Kategori Farmakologi');
    for (const column of ['Kode', 'Nama Kategori', 'Deskripsi', 'Kode ATC', 'Dibuat oleh', 'Tanggal Update', 'Status', 'Aksi']) {
      expect(fixture.nativeElement.textContent).toContain(column);
    }
    expect(fixture.nativeElement.textContent).toContain('J01');
    expect(component.pharmacologyCategories.length).toBeGreaterThan(0);
  });

  it('should render the pharmacology mechanisms table with requested columns', () => {
    component.selectTab('produk');
    component.selectedProductSection.set('Farmakologi');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Daftar Farmakologi');
    const headers = Array.from(
      fixture.nativeElement.querySelectorAll('.pharmacology-mechanism-table thead th'),
      (header: Element) => header.textContent?.trim(),
    );
    expect(headers).toEqual([
      'Kode Kategori Farmakologi',
      'Kode',
      'Nama Mekanisme',
      'Mekanisme Kerja',
      'Dibuat oleh',
      'Tanggal Update',
      'Status',
      'Aksi',
    ]);
    for (const column of headers) {
      expect(fixture.nativeElement.textContent).toContain(column);
    }
    expect(fixture.nativeElement.textContent).toContain('MEK-001');
    expect(fixture.nativeElement.textContent).toContain('Inhibisi COX');
  });

  it('should render administration routes with KFA codes and requested columns', () => {
    component.selectTab('produk');
    component.selectedProductSection.set('Cara Pemberian');
    fixture.detectChanges();

    const headers = Array.from(
      fixture.nativeElement.querySelectorAll('.administration-route-table thead th'),
      (header: Element) => header.textContent?.trim(),
    );
    expect(headers).toEqual([
      'Kode',
      'Nama Cara',
      'Nama Lengkap',
      'KFA (SNOMED)',
      'Definisi',
      'Contoh Sediaan',
      'Dibuat Oleh',
      'Tanggal Update',
      'Status',
      'Aksi',
    ]);
    expect(fixture.nativeElement.textContent).toContain('RUTE-001');
    expect(fixture.nativeElement.textContent).toContain('26643006');
  });

  it('should render dosage forms with requested columns and KFA values', () => {
    component.selectTab('produk');
    component.selectedProductSection.set('Sediaan');
    fixture.detectChanges();

    const headers = Array.from(
      fixture.nativeElement.querySelectorAll('.dosage-form-table thead th'),
      (header: Element) => header.textContent?.trim(),
    );
    expect(headers).toEqual([
      'Kode',
      'Nama Sediaan',
      'Varian',
      'Kode KFA',
      'Jenis Fisik',
      'Dibuat Oleh',
      'Tanggal Update',
      'Status',
      'Aksi',
    ]);
    expect(fixture.nativeElement.textContent).toContain('SED-001');
    expect(fixture.nativeElement.textContent).toContain('385055001');
  });

  it('should render packaging, unit, and manufacturer tables with requested columns', () => {
    component.selectTab('produk');

    const cases = [
      {
        section: 'Kemasan',
        table: '.packaging-table',
        headers: ['Kode', 'Nama Kemasan', 'Tipe Kemasan', 'Deskripsi', 'Kontak Langsung Obat', 'Dibuat Oleh', 'Tanggal Update', 'Status', 'Aksi'],
        sample: 'KMS-001',
      },
      {
        section: 'Satuan',
        table: '.product-unit-table',
        headers: ['Kode', 'Nama Satuan', 'Kode Satuan KFA', 'Kode SNOMED', 'Definisi', 'Dibuat Oleh', 'Tanggal Update', 'Status', 'Aksi'],
        sample: 'SAT-001',
      },
      {
        section: 'Manufacturer',
        table: '.manufacturer-table',
        headers: ['Kode', 'Nama Manufacturer', 'Jenis Perusahaan', 'Alamat', 'No. Sertifikat CPOB', 'Status CPOB', 'Kategori', 'Tanggal Update', 'Status', 'Aksi'],
        sample: 'MFR-001',
      },
    ];

    for (const item of cases) {
      component.selectedProductSection.set(item.section);
      fixture.detectChanges();

      const headers = Array.from(
        fixture.nativeElement.querySelectorAll(`${item.table} thead th`),
        (header: Element) => header.textContent?.trim(),
      );
      expect(headers).toEqual(item.headers);
      expect(fixture.nativeElement.textContent).toContain(item.sample);
    }
  });

  it('should search and filter every product list', () => {
    component.selectTab('produk');

    component.categorySearch.set('obat keras');
    expect(component.filteredCategories.map((category) => category.code)).toEqual(['KAT-003']);
    component.categoryStatusFilter.set('Nonaktif');
    expect(component.filteredCategories).toHaveLength(0);
    component.categorySearch.set('');
    component.categoryStatusFilter.set('');

    component.drugClassSearch.set('narkotika');
    component.drugClassPrescriptionFilter.set('true');
    expect(component.filteredDrugClasses.map((drugClass) => drugClass.code)).toEqual(['GOL-005']);
    component.drugClassStatusFilter.set('Nonaktif');
    expect(component.filteredDrugClasses).toHaveLength(0);
    component.drugClassSearch.set('');
    component.drugClassStatusFilter.set('');
    component.drugClassPrescriptionFilter.set('');

    component.pharmacologySearch.set('J01');
    expect(component.filteredPharmacologyCategories.map((category) => category.code)).toEqual(['FAR-002']);
    component.pharmacologyStatusFilter.set('Nonaktif');
    expect(component.filteredPharmacologyCategories).toHaveLength(0);
    component.pharmacologySearch.set('');
    component.pharmacologyStatusFilter.set('');

    component.productDataSearch.set('Vitamin');
    expect(component.filteredSectionProducts.map((category) => category.code)).toEqual(['KAT-005']);
    component.productDataStatusFilter.set('Nonaktif');
    expect(component.filteredSectionProducts).toHaveLength(0);

    component.productDataSearch.set('antagonis reseptor');
    component.productDataStatusFilter.set('');
    expect(component.filteredPharmacologyMechanisms.map((mechanism) => mechanism.code)).toEqual(['MEK-005']);
    component.productDataStatusFilter.set('Nonaktif');
    expect(component.filteredPharmacologyMechanisms).toHaveLength(0);

    component.productDataSearch.set('26643006');
    component.productDataStatusFilter.set('');
    expect(component.filteredAdministrationRoutes.map((route) => route.code)).toEqual(['RUTE-001']);
    component.productDataStatusFilter.set('Nonaktif');
    expect(component.filteredAdministrationRoutes).toHaveLength(0);

    component.productDataSearch.set('salut selaput');
    component.productDataStatusFilter.set('');
    expect(component.filteredDosageForms.map((form) => form.code)).toEqual(['SED-001']);
    component.productDataStatusFilter.set('Nonaktif');
    expect(component.filteredDosageForms).toHaveLength(0);

    component.productDataSearch.set('blister');
    component.productDataStatusFilter.set('');
    expect(component.filteredPackagingTypes.map((packaging) => packaging.code)).toEqual(['KMS-001']);
    component.productDataSearch.set('BTL');
    expect(component.filteredProductUnits.map((unit) => unit.code)).toEqual(['SAT-004']);
    component.productDataSearch.set('cpotb-2024');
    expect(component.filteredManufacturers.map((manufacturer) => manufacturer.code)).toEqual(['MFR-003']);
    component.productDataStatusFilter.set('Nonaktif');
    expect(component.filteredManufacturers).toHaveLength(0);
  });

  it('should filter, search, and paginate access users', () => {
    component.selectTab('hak-akses');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Daftar Pengguna');
    expect(component.paginatedAccessUsers).toHaveLength(10);

    component.accessRoleFilter.set('Dokter');
    component.onAccessFilterChange();
    expect(component.filteredAccessUsers.every((user) => user.role === 'Dokter')).toBe(true);

    component.accessRoleFilter.set('');
    component.accessSearch.set('maria');
    component.onAccessFilterChange();
    expect(component.filteredAccessUsers).toHaveLength(1);
    expect(component.filteredAccessUsers[0].name).toBe('Maria Oktaviani');

    component.accessSearch.set('');
    component.accessPageSize.set(5);
    component.onAccessFilterChange();
    component.setAccessPage(2);
    expect(component.paginatedAccessUsers).toHaveLength(5);
    expect(component.accessPage()).toBe(2);
  });

  it('should add, inspect, edit, and delete an RBAC user', () => {
    component.selectTab('hak-akses');
    component.openAddAccessUser();
    component.accessUserDraft = {
      id: '',
      name: 'User Contoh',
      email: 'contoh@healora.co.id',
      phone: '081200000000',
      role: 'Admin',
      status: 'Aktif',
    };
    component.submitAccessUser();
    const createdUser = component.accessUsers()[0];
    expect(createdUser.id).toBe('USR-013');

    component.openAccessUserDetails(createdUser);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Detail Pengguna');
    expect(component.selectedAccessUser?.email).toBe('contoh@healora.co.id');

    component.openEditAccessUser(createdUser);
    component.accessUserDraft.role = 'Super Admin';
    component.submitAccessUser();
    expect(component.accessUsers()[0].role).toBe('Super Admin');

    component.openDeleteAccessUser(createdUser.id);
    expect(component.deletingAccessUser?.name).toBe('User Contoh');
    component.deleteAccessUser();
    expect(component.accessUsers().some((user) => user.id === createdUser.id)).toBe(false);
  });

  it('should render the master product catalog and product cards', () => {
    component.selectTab('master-katalog');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Master Katalog Produk');
    expect(fixture.nativeElement.textContent).toContain('Tambah Produk Baru');
    expect(fixture.nativeElement.textContent).toContain('Healora Analgesik 500 mg');
    expect(fixture.nativeElement.textContent).toContain('DUMMY-BPOM-001');
    expect(fixture.nativeElement.textContent).toContain('data demo lokal');
    expect(fixture.nativeElement.querySelectorAll('.catalog-product-card')).toHaveLength(4);
  });

  it('should switch the catalog between grid and list views', () => {
    component.selectTab('master-katalog');
    fixture.detectChanges();

    const productContainer = fixture.nativeElement.querySelector('.catalog-product-grid');
    const gridButton = fixture.nativeElement.querySelector('[aria-label="Tampilan grid"]');
    const listButton = fixture.nativeElement.querySelector('[aria-label="Tampilan list"]');
    expect(productContainer.classList.contains('catalog-list-view')).toBe(false);
    expect(gridButton.getAttribute('aria-pressed')).toBe('true');
    expect(listButton.getAttribute('aria-pressed')).toBe('false');

    listButton.click();
    fixture.detectChanges();
    expect(productContainer.classList.contains('catalog-list-view')).toBe(true);
    expect(listButton.getAttribute('aria-pressed')).toBe('true');

    gridButton.click();
    fixture.detectChanges();
    expect(productContainer.classList.contains('catalog-list-view')).toBe(false);
    expect(gridButton.getAttribute('aria-pressed')).toBe('true');
  });

  it('should search and filter products in the master catalog', () => {
    component.selectTab('master-katalog');
    component.catalogSearch.set('vitamin');
    expect(component.filteredCatalogProducts.map((product) => product.code)).toEqual(['PRD-002', 'PRD-004']);

    component.catalogSearch.set('');
    component.catalogCategoryFilter.set('KAT-003');
    expect(component.filteredCatalogProducts.map((product) => product.code)).toEqual(['PRD-001']);

    component.catalogCategoryFilter.set('');
    component.catalogStatusFilter.set('Nonaktif');
    expect(component.filteredCatalogProducts.map((product) => product.code)).toEqual(['PRD-003']);
  });

  it('should paginate catalog products six at a time and reset the page on filtering', () => {
    const firstProduct = component.catalogProducts()[0];
    component.catalogProducts.set([
      ...component.catalogProducts(),
      ...Array.from({ length: 9 }, (_, index) => ({
        ...firstProduct,
        code: `PRD-${String(index + 5).padStart(3, '0')}`,
        name: `Produk Demo ${index + 5}`,
        bpomNumber: `DUMMY-BPOM-${String(index + 5).padStart(3, '0')}`,
      })),
    ]);
    component.selectTab('master-katalog');
    fixture.detectChanges();

    expect(component.paginatedCatalogProducts).toHaveLength(6);
    expect(component.catalogPageCount).toBe(3);
    expect(fixture.nativeElement.querySelectorAll('.catalog-product-card')).toHaveLength(6);

    component.setCatalogPage(2);
    expect(component.catalogPageStart).toBe(7);
    expect(component.catalogPageEnd).toBe(12);
    expect(component.paginatedCatalogProducts).toHaveLength(6);

    component.setCatalogPage(3);
    expect(component.catalogPageStart).toBe(13);
    expect(component.catalogPageEnd).toBe(13);
    expect(component.paginatedCatalogProducts).toHaveLength(1);

    component.catalogStatusFilter.set('Nonaktif');
    component.onCatalogFilterChange();
    expect(component.catalogPage()).toBe(1);
    expect(component.catalogPageCount).toBe(1);
  });

  it('should show product details and related product references', () => {
    component.selectTab('master-katalog');
    component.openCatalogProductDetails(component.catalogProducts()[0]);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Detail Produk');
    expect(fixture.nativeElement.textContent).toContain('Komposisi Bahan Aktif');
    expect(fixture.nativeElement.textContent).toContain('Indikasi Klinis');
    expect(fixture.nativeElement.textContent).toContain('Kontraindikasi & Peringatan Khusus');
    expect(fixture.nativeElement.textContent).toContain('Obat Keras');
    expect(fixture.nativeElement.textContent).toContain('Informasi klinis dan NIE harus diverifikasi');
  });

  it('should add a catalog product using selected product references', () => {
    component.selectTab('master-katalog');
    component.openAddCatalogProduct();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Tambah Produk Baru');
    expect(fixture.nativeElement.textContent).toContain('Bahan Aktif');

    component.catalogProductDraft = {
      ...component.catalogProductDraft,
      name: 'Produk Baru Contoh',
      bpomNumber: 'DUMMY-BPOM-005',
      categoryCode: 'KAT-005',
      description: 'Deskripsi produk contoh.',
      activeIngredients: 'Bahan aktif contoh.',
      additionalIngredients: 'Bahan tambahan contoh.',
      clinicalBenefits: 'Informasi indikasi contoh.',
      dosageInstructions: 'Ikuti petunjuk pada label resmi.',
      sideEffects: 'Informasi efek samping contoh.',
      interactions: 'Informasi interaksi contoh.',
      contraindicationsWarnings: 'Informasi peringatan contoh.',
    };
    component.submitCatalogProduct();

    expect(component.catalogProducts()[0].code).toBe('PRD-005');
    expect(component.catalogProducts()[0].name).toBe('Produk Baru Contoh');
    expect(component.catalogProducts()[0].categoryCode).toBe('KAT-005');
    expect(component.catalogProducts()[0].updatedAt).toMatch(/^\d{2}-\d{2}-\d{4}, \d{2}:\d{2} WIB$/);
    expect(component.catalogModal()).toBe('closed');
  });

  it('should reject incomplete and duplicate catalog product registrations', () => {
    component.openAddCatalogProduct();
    component.catalogProductDraft = {
      ...component.catalogProductDraft,
      name: 'Produk Tidak Lengkap',
    };
    component.submitCatalogProduct();
    expect(component.catalogFormError()).toContain('wajib diisi');
    expect(component.catalogModal()).toBe('form');

    component.catalogProductDraft = {
      ...component.catalogProductDraft,
      name: 'Produk Duplikat',
      bpomNumber: 'dummy-bpom-001',
      categoryCode: 'KAT-001',
      description: 'Deskripsi.',
      activeIngredients: 'Bahan aktif.',
      additionalIngredients: 'Bahan tambahan.',
      clinicalBenefits: 'Indikasi.',
      dosageInstructions: 'Petunjuk.',
      sideEffects: 'Efek samping.',
      interactions: 'Interaksi.',
      contraindicationsWarnings: 'Peringatan.',
    };
    component.submitCatalogProduct();
    expect(component.catalogFormError()).toContain('NIE BPOM sudah digunakan');
    expect(component.catalogProducts()).toHaveLength(4);
  });
});
