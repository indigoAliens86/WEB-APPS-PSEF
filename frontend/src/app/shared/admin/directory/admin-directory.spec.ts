import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDirectory, DirectoryConfig, DirectoryRecord } from './admin-directory';

describe('AdminDirectory', () => {
  let component: AdminDirectory;
  let fixture: ComponentFixture<AdminDirectory>;

  const config: DirectoryConfig = {
    title: 'Daftar Contoh',
    description: 'Kelola data contoh.',
    entityLabel: 'Contoh',
    idPrefix: 'EX',
    idLabel: 'ID',
    columns: [{ key: 'id', label: 'ID' }, { key: 'name', label: 'Nama' }, { key: 'status', label: 'Status' }],
    fields: [
      { key: 'name', label: 'Nama', required: true },
      { key: 'status', label: 'Status', type: 'select', required: true, options: [{ label: 'Aktif', value: 'Aktif' }, { label: 'Nonaktif', value: 'Nonaktif' }] },
    ],
    searchKeys: ['id', 'name'],
    filters: [{ key: 'status', label: 'Status', options: [{ label: 'Aktif', value: 'Aktif' }, { label: 'Nonaktif', value: 'Nonaktif' }] }],
    pageSize: 2,
  };

  const records: DirectoryRecord[] = [
    { id: 'EX-001', name: 'Data Satu', status: 'Aktif' },
    { id: 'EX-002', name: 'Data Dua', status: 'Aktif' },
    { id: 'EX-003', name: 'Data Tiga', status: 'Nonaktif' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AdminDirectory] }).compileComponents();
    fixture = TestBed.createComponent(AdminDirectory);
    fixture.componentRef.setInput('config', config);
    fixture.componentRef.setInput('initialRecords', records);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('shows searchable and filterable records with pagination', () => {
    expect(fixture.nativeElement.textContent).toContain('Daftar Contoh');
    expect(component.paginatedRecords).toHaveLength(2);
    component.onSearchChange('Data Tiga');
    expect(component.filteredRecords.map((record) => record['id'])).toEqual(['EX-003']);
    component.onSearchChange('');
    component.setFilter('status', 'Nonaktif');
    expect(component.filteredRecords.map((record) => record['id'])).toEqual(['EX-003']);
    expect(component.page()).toBe(1);
  });

  it('adds, edits, and deletes records', () => {
    component.openAdd();
    component.draft = { name: 'Data Empat', status: 'Aktif' };
    component.submit();
    expect(component.records()[0]).toMatchObject({ id: 'EX-004', name: 'Data Empat' });

    component.openEdit(component.records()[0]);
    component.draft['name'] = 'Data Empat Diperbarui';
    component.submit();
    expect(component.records()[0]['name']).toBe('Data Empat Diperbarui');

    component.openDelete('EX-004');
    component.deleteRecord();
    expect(component.records().some((record) => record['id'] === 'EX-004')).toBe(false);
  });

  it('keeps the form open when required fields are missing', () => {
    component.openAdd();
    component.draft = { name: '', status: 'Aktif' };
    component.submit();
    expect(component.formError()).toBe('Nama wajib diisi.');
    expect(component.modal()).toBe('form');
  });
});
