import { Injectable, signal, computed } from '@angular/core';

export interface FasilitasProduct {
  id: string;
  sku: string;
  barcode: string;
  name: string;
  genericName: string;
  bpomNumber: string;
  kategori: string;
  golongan: 'Bebas' | 'Bebas Terbatas' | 'Keras' | 'Herbal' | 'Alat Kesehatan';
  bentukSediaan: string;
  satuan: string;
  manufacturer: string;
  source: 'Katalog' | 'Manual';
  catalogCode?: string;
  hargaBeli: number;
  hargaJual: number;
  diskon: number;
  stok: number;
  stokMin: number;
  batchNumber: string;
  expiredDate: string;
  rakLokasi: string;
  status: 'Tersedia' | 'Menipis' | 'Habis';
  deskripsi: string;
  aturanPakai: string;
  komposisi: string;
  efekSamping?: string;
  kontraindikasi?: string;
  thumbnail: string;
  updatedAt: string;
}

export interface MasterCatalogItem {
  code: string;
  name: string;
  genericName: string;
  bpomNumber: string;
  category: string;
  golongan: 'Bebas' | 'Bebas Terbatas' | 'Keras' | 'Herbal' | 'Alat Kesehatan';
  dosageForm: string;
  unit: string;
  manufacturer: string;
  description: string;
  activeIngredients: string;
  clinicalBenefits: string;
  dosageInstructions: string;
  suggestedHpp: number;
  suggestedHET: number;
  thumbnail: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProdukService {
  // Master Catalog provided by Admin
  readonly masterCatalog = signal<MasterCatalogItem[]>([
    {
      code: 'CAT-001',
      name: 'Paracetamol 500 mg',
      genericName: 'Paracetamol',
      bpomNumber: 'DKL9812345601A1',
      category: 'Obat Bebas',
      golongan: 'Bebas',
      dosageForm: 'Tablet',
      unit: 'Strip (10 Tablet)',
      manufacturer: 'PT Kimia Farma Tbk',
      description: 'Analgesik dan antipiretik untuk meredakan sakit kepala, nyeri ringan, dan demam.',
      activeIngredients: 'Paracetamol 500 mg',
      clinicalBenefits: 'Meringankan sakit kepala, sakit gigi, dan menurunkan demam.',
      dosageInstructions: 'Dewasa: 1-2 tablet, 3-4 kali sehari sesudah makan. Maks 8 tablet/hari.',
      suggestedHpp: 6500,
      suggestedHET: 9000,
      thumbnail: 'assets/images/thumbnail/ibuprofen.svg',
    },
    {
      code: 'CAT-002',
      name: 'Amoxicillin 500 mg',
      genericName: 'Amoxicillin Trihydrate',
      bpomNumber: 'DKL0223456702A1',
      category: 'Obat Keras',
      golongan: 'Keras',
      dosageForm: 'Kaplet',
      unit: 'Strip (10 Kaplet)',
      manufacturer: 'PT Kalbe Farma Tbk',
      description: 'Antibiotik spektrum luas golongan penisilin untuk infeksi saluran pernapasan, THT, dan kulit.',
      activeIngredients: 'Amoxicillin Trihydrate 500 mg',
      clinicalBenefits: 'Terapi infeksi bakteri gram positif dan gram negatif.',
      dosageInstructions: 'Dewasa: 1 kaplet tiap 8 jam harus dihabiskan sesuai resep dokter.',
      suggestedHpp: 12000,
      suggestedHET: 16500,
      thumbnail: 'assets/images/thumbnail/asam-mefenamat.svg',
    },
    {
      code: 'CAT-003',
      name: 'Vitamin C 500 mg Buffered',
      genericName: 'Ascorbic Acid & Sodium Ascorbate',
      bpomNumber: 'SD191554891',
      category: 'Suplemen & Vitamin',
      golongan: 'Bebas',
      dosageForm: 'Tablet Salut',
      unit: 'Botol (30 Tablet)',
      manufacturer: 'PT Sehat Farma',
      description: 'Suplemen vitamin C ramah lambung untuk membantu memelihara daya tahan tubuh.',
      activeIngredients: 'Ascorbic Acid 250 mg, Sodium Ascorbate 281 mg',
      clinicalBenefits: 'Antioksidan dan pemeliharaan imunitas tubuh.',
      dosageInstructions: '1 tablet sehari sekali setelah makan.',
      suggestedHpp: 45000,
      suggestedHET: 60000,
      thumbnail: 'assets/images/thumbnail/vitamin-b.svg',
    },
    {
      code: 'CAT-004',
      name: 'Omeprazole 20 mg',
      genericName: 'Omeprazole',
      bpomNumber: 'DKL0432109804A1',
      category: 'Obat Keras',
      golongan: 'Keras',
      dosageForm: 'Kapsul',
      unit: 'Strip (10 Kapsul)',
      manufacturer: 'PT Dexa Medica',
      description: 'Penghambat pompa proton (PPI) untuk mengatasi tukak lambung dan GERD.',
      activeIngredients: 'Omeprazole 20 mg',
      clinicalBenefits: 'Menekan sekresi asam lambung berlebih.',
      dosageInstructions: '1 kapsul, 1-2 kali sehari 30 menit sebelum makan.',
      suggestedHpp: 14000,
      suggestedHET: 20000,
      thumbnail: 'assets/images/thumbnail/ibuprofen.svg',
    },
    {
      code: 'CAT-005',
      name: 'Cetirizine HCl 10 mg',
      genericName: 'Cetirizine Hydrochloride',
      bpomNumber: 'DKL0745678905A1',
      category: 'Obat Bebas Terbatas',
      golongan: 'Bebas Terbatas',
      dosageForm: 'Tablet Salut',
      unit: 'Strip (10 Tablet)',
      manufacturer: 'PT Sanbe Farma',
      description: 'Antihistamin generasi kedua untuk meredakan rinitis alergi dan urtikaria.',
      activeIngredients: 'Cetirizine HCl 10 mg',
      clinicalBenefits: 'Meredakan gatal-gatal alergi, biduran, bersin-bersin.',
      dosageInstructions: 'Dewasa: 1 tablet sekali sehari pada malam hari.',
      suggestedHpp: 8000,
      suggestedHET: 12000,
      thumbnail: 'assets/images/thumbnail/asam-mefenamat.svg',
    },
    {
      code: 'CAT-006',
      name: 'Healora Analgesik Forte 500 mg',
      genericName: 'Ibuprofen',
      bpomNumber: 'DKL1112233406A1',
      category: 'Obat Bebas Terbatas',
      golongan: 'Bebas Terbatas',
      dosageForm: 'Tablet',
      unit: 'Strip (10 Tablet)',
      manufacturer: 'PT Sehat Farma',
      description: 'Antiinflamasi non-steroid (OAINS) untuk nyeri haid, dismenore, dan peradangan sendi.',
      activeIngredients: 'Ibuprofen 500 mg',
      clinicalBenefits: 'Meredakan nyeri dan inflamasi.',
      dosageInstructions: '1 tablet 3 kali sehari sesudah makan saat timbul nyeri.',
      suggestedHpp: 8500,
      suggestedHET: 13000,
      thumbnail: 'assets/images/thumbnail/ibuprofen.svg',
    },
    {
      code: 'CAT-007',
      name: 'Metformin HCl 500 mg',
      genericName: 'Metformin Hydrochloride',
      bpomNumber: 'DKL0556789007A1',
      category: 'Obat Keras',
      golongan: 'Keras',
      dosageForm: 'Tablet',
      unit: 'Strip (10 Tablet)',
      manufacturer: 'PT Kimia Farma Tbk',
      description: 'Antidiabetes oral golongan biguanid untuk mengontrol kadar glukosa darah pada diabetes tipe 2.',
      activeIngredients: 'Metformin HCl 500 mg',
      clinicalBenefits: 'Menurunkan resistensi insulin dan produksi glukosa hepatik.',
      dosageInstructions: 'Sesuai petunjuk dokter, 1 tablet 2-3 kali sehari bersama makanan.',
      suggestedHpp: 5000,
      suggestedHET: 8000,
      thumbnail: 'assets/images/thumbnail/asam-mefenamat.svg',
    },
    {
      code: 'CAT-008',
      name: 'Antasida Doen Suspensi 60 ml',
      genericName: 'Aluminium Hidroksida & Magnesium Hidroksida',
      bpomNumber: 'DBL9112345608A1',
      category: 'Obat Bebas',
      golongan: 'Bebas',
      dosageForm: 'Sirup Suspensi',
      unit: 'Botol (60 ml)',
      manufacturer: 'PT Kalbe Farma Tbk',
      description: 'Kombinasi antasida untuk menetralkan asam lambung berlebih, rasa perih, dan mual.',
      activeIngredients: 'Aluminium Hidroksida 200 mg, Magnesium Hidroksida 200 mg / 5ml',
      clinicalBenefits: 'Meredakan nyeri ulu hati dan kembung.',
      dosageInstructions: '1-2 sendok takar (5-10 ml), 3-4 kali sehari saat perut kosong.',
      suggestedHpp: 7500,
      suggestedHET: 11000,
      thumbnail: 'assets/images/thumbnail/vitamin-b.svg',
    },
  ]);

  // Inventory Products of this Facility
  readonly products = signal<FasilitasProduct[]>([
    {
      id: 'FAS-PRD-001',
      sku: 'SKU-001-PCM',
      barcode: '8991234560012',
      name: 'Paracetamol 500 mg',
      genericName: 'Paracetamol',
      bpomNumber: 'DKL9812345601A1',
      kategori: 'Obat Bebas',
      golongan: 'Bebas',
      bentukSediaan: 'Tablet',
      satuan: 'Strip (10 Tablet)',
      manufacturer: 'PT Kimia Farma Tbk',
      source: 'Katalog',
      catalogCode: 'CAT-001',
      hargaBeli: 6500,
      hargaJual: 8500,
      diskon: 0,
      stok: 125,
      stokMin: 20,
      batchNumber: 'BTC-260101',
      expiredDate: '2028-06-30',
      rakLokasi: 'Rak A-01',
      status: 'Tersedia',
      deskripsi: 'Analgesik dan antipiretik untuk meredakan sakit kepala, nyeri ringan, dan demam.',
      aturanPakai: 'Dewasa: 1-2 tablet, 3-4 kali sehari sesudah makan.',
      komposisi: 'Paracetamol 500 mg',
      thumbnail: 'assets/images/thumbnail/ibuprofen.svg',
      updatedAt: '24 Mei 2026, 10:30 WIB',
    },
    {
      id: 'FAS-PRD-002',
      sku: 'SKU-002-AMX',
      barcode: '8991234560029',
      name: 'Amoxicillin 500 mg',
      genericName: 'Amoxicillin Trihydrate',
      bpomNumber: 'DKL0223456702A1',
      kategori: 'Obat Keras',
      golongan: 'Keras',
      bentukSediaan: 'Kaplet',
      satuan: 'Strip (10 Kaplet)',
      manufacturer: 'PT Kalbe Farma Tbk',
      source: 'Katalog',
      catalogCode: 'CAT-002',
      hargaBeli: 12000,
      hargaJual: 16500,
      diskon: 0,
      stok: 45,
      stokMin: 15,
      batchNumber: 'BTC-260212',
      expiredDate: '2027-11-20',
      rakLokasi: 'Rak B-03 (Keras)',
      status: 'Tersedia',
      deskripsi: 'Antibiotik spektrum luas golongan penisilin.',
      aturanPakai: '1 kaplet tiap 8 jam harus dihabiskan sesuai resep dokter.',
      komposisi: 'Amoxicillin Trihydrate 500 mg',
      thumbnail: 'assets/images/thumbnail/asam-mefenamat.svg',
      updatedAt: '24 Mei 2026, 09:15 WIB',
    },
    {
      id: 'FAS-PRD-003',
      sku: 'SKU-003-VTC',
      barcode: '8991234560036',
      name: 'Vitamin C 500 mg Buffered',
      genericName: 'Ascorbic Acid & Sodium Ascorbate',
      bpomNumber: 'SD191554891',
      kategori: 'Suplemen & Vitamin',
      golongan: 'Bebas',
      bentukSediaan: 'Tablet Salut',
      satuan: 'Botol (30 Tablet)',
      manufacturer: 'PT Sehat Farma',
      source: 'Katalog',
      catalogCode: 'CAT-003',
      hargaBeli: 45000,
      hargaJual: 58000,
      diskon: 3000,
      stok: 12,
      stokMin: 15,
      batchNumber: 'BTC-260305',
      expiredDate: '2028-01-15',
      rakLokasi: 'Etalase Depan A-1',
      status: 'Menipis',
      deskripsi: 'Suplemen vitamin C ramah lambung untuk membantu memelihara daya tahan tubuh.',
      aturanPakai: '1 tablet sehari sekali setelah makan.',
      komposisi: 'Ascorbic Acid 250 mg, Sodium Ascorbate 281 mg',
      thumbnail: 'assets/images/thumbnail/vitamin-b.svg',
      updatedAt: '23 Mei 2026, 16:40 WIB',
    },
    {
      id: 'FAS-PRD-004',
      sku: 'SKU-004-OMZ',
      barcode: '8991234560043',
      name: 'Omeprazole 20 mg',
      genericName: 'Omeprazole',
      bpomNumber: 'DKL0432109804A1',
      kategori: 'Obat Keras',
      golongan: 'Keras',
      bentukSediaan: 'Kapsul',
      satuan: 'Strip (10 Kapsul)',
      manufacturer: 'PT Dexa Medica',
      source: 'Katalog',
      catalogCode: 'CAT-004',
      hargaBeli: 14000,
      hargaJual: 19500,
      diskon: 0,
      stok: 80,
      stokMin: 20,
      batchNumber: 'BTC-260408',
      expiredDate: '2027-08-30',
      rakLokasi: 'Rak B-01 (Keras)',
      status: 'Tersedia',
      deskripsi: 'Penghambat pompa proton (PPI) untuk asam lambung.',
      aturanPakai: '1 kapsul, 1-2 kali sehari 30 menit sebelum makan.',
      komposisi: 'Omeprazole 20 mg',
      thumbnail: 'assets/images/thumbnail/ibuprofen.svg',
      updatedAt: '22 Mei 2026, 11:20 WIB',
    },
    {
      id: 'FAS-PRD-005',
      sku: 'SKU-005-CTZ',
      barcode: '8991234560050',
      name: 'Cetirizine HCl 10 mg',
      genericName: 'Cetirizine Hydrochloride',
      bpomNumber: 'DKL0745678905A1',
      kategori: 'Obat Bebas Terbatas',
      golongan: 'Bebas Terbatas',
      bentukSediaan: 'Tablet Salut',
      satuan: 'Strip (10 Tablet)',
      manufacturer: 'PT Sanbe Farma',
      source: 'Katalog',
      catalogCode: 'CAT-005',
      hargaBeli: 8000,
      hargaJual: 11500,
      diskon: 0,
      stok: 0,
      stokMin: 10,
      batchNumber: 'BTC-260515',
      expiredDate: '2027-05-10',
      rakLokasi: 'Rak A-04',
      status: 'Habis',
      deskripsi: 'Antihistamin generasi kedua untuk rinitis alergi dan gatal.',
      aturanPakai: 'Dewasa: 1 tablet sekali sehari malam hari.',
      komposisi: 'Cetirizine HCl 10 mg',
      thumbnail: 'assets/images/thumbnail/asam-mefenamat.svg',
      updatedAt: '20 Mei 2026, 14:05 WIB',
    },
    {
      id: 'FAS-PRD-006',
      sku: 'SKU-006-MNL',
      barcode: '8991234560067',
      name: 'Salep Khusus Luka Bakar Apotek',
      genericName: 'Centella Asiatica & Madu Murni',
      bpomNumber: 'TR223019881',
      kategori: 'Herbal',
      golongan: 'Herbal',
      bentukSediaan: 'Salep',
      satuan: 'Tube (15 gram)',
      manufacturer: 'Laboratorium Galenika Apotek Kimia Sehat',
      source: 'Manual',
      hargaBeli: 18000,
      hargaJual: 28000,
      diskon: 0,
      stok: 35,
      stokMin: 10,
      batchNumber: 'BTC-INT-009',
      expiredDate: '2027-03-31',
      rakLokasi: 'Etalase Topikal T-02',
      status: 'Tersedia',
      deskripsi: 'Sediaan racikan salep herbal berlisensi farmasi untuk mempercepat regenerasi kulit luka bakar ringan.',
      aturanPakai: 'Oleskan tipis pada area luka bersih 2-3 kali sehari.',
      komposisi: 'Ekstrak Centella Asiatica 10%, Madu Murni 15%, Basis Salep ad 100%',
      thumbnail: 'assets/images/thumbnail/vitamin-b.svg',
      updatedAt: '19 Mei 2026, 15:30 WIB',
    },
  ]);

  // Computed KPI Metrics
  readonly totalProdukCount = computed(() => this.products().length);
  readonly stokTersediaCount = computed(
    () => this.products().filter((p) => p.status === 'Tersedia').length
  );
  readonly stokMenipisCount = computed(
    () => this.products().filter((p) => p.status === 'Menipis').length
  );
  readonly stokHabisCount = computed(
    () => this.products().filter((p) => p.status === 'Habis').length
  );

  getProductById(id: string): FasilitasProduct | undefined {
    return this.products().find((p) => p.id === id);
  }

  addProduct(product: Omit<FasilitasProduct, 'id' | 'status' | 'updatedAt'>): FasilitasProduct {
    const nextNum = this.products().length + 1;
    const newId = `FAS-PRD-${String(nextNum).padStart(3, '0')}`;
    let computedStatus: 'Tersedia' | 'Menipis' | 'Habis' = 'Tersedia';
    if (product.stok <= 0) {
      computedStatus = 'Habis';
    } else if (product.stok <= product.stokMin) {
      computedStatus = 'Menipis';
    }

    const newProduct: FasilitasProduct = {
      ...product,
      id: newId,
      status: computedStatus,
      updatedAt: 'Baru saja',
    };

    this.products.update((list) => [newProduct, ...list]);
    return newProduct;
  }

  updateProduct(id: string, updates: Partial<FasilitasProduct>): boolean {
    let updated = false;
    this.products.update((list) =>
      list.map((item) => {
        if (item.id === id) {
          updated = true;
          const merged = { ...item, ...updates, updatedAt: 'Diperbarui baru saja' };
          if (merged.stok <= 0) {
            merged.status = 'Habis';
          } else if (merged.stok <= merged.stokMin) {
            merged.status = 'Menipis';
          } else {
            merged.status = 'Tersedia';
          }
          return merged;
        }
        return item;
      })
    );
    return updated;
  }

  deleteProduct(id: string): void {
    this.products.update((list) => list.filter((p) => p.id !== id));
  }
}
