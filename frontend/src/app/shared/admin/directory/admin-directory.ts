import { Component, OnInit, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface DirectoryOption {
  label: string;
  value: string;
}

export interface DirectoryField {
  key: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'date' | 'select';
  required?: boolean;
  options?: DirectoryOption[];
}

export interface DirectoryFilter {
  key: string;
  label: string;
  options: DirectoryOption[];
}

export interface DirectoryColumn {
  key: string;
  label: string;
  kind?: 'person' | 'contact' | 'license' | 'verification';
  secondaryKey?: string;
  secondaryPrefix?: string;
}

export interface DirectoryStat {
  label: string;
  icon: string;
  color: string;
  countKey?: string;
  countValue?: string;
}

export interface DirectoryConfig {
  title: string;
  description: string;
  entityLabel: string;
  idPrefix: string;
  idLabel: string;
  columns: DirectoryColumn[];
  fields: DirectoryField[];
  searchKeys: string[];
  filters: DirectoryFilter[];
  pageSize?: number;
  stats?: DirectoryStat[];
}

export type DirectoryRecord = Record<string, string>;

@Component({
  selector: 'app-admin-directory',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-directory.html',
  styleUrl: './admin-directory.css',
})
export class AdminDirectory implements OnInit {
  readonly config = input.required<DirectoryConfig>();
  readonly initialRecords = input.required<DirectoryRecord[]>();
  readonly records = signal<DirectoryRecord[]>([]);
  readonly search = signal('');
  readonly filters = signal<Partial<Record<string, string>>>({});
  readonly page = signal(1);
  readonly modal = signal<'closed' | 'form' | 'detail' | 'delete'>('closed');
  readonly formError = signal('');
  readonly editingId = signal<string | null>(null);
  readonly selectedId = signal<string | null>(null);
  readonly deletingId = signal<string | null>(null);
  draft: DirectoryRecord = {};

  ngOnInit(): void {
    this.records.set(this.initialRecords().map((record) => ({ ...record })));
  }

  get filteredRecords(): DirectoryRecord[] {
    const query = this.search().trim().toLocaleLowerCase();
    return this.records().filter((record) =>
      (!query || this.config().searchKeys.some((key) => (record[key] ?? '').toLocaleLowerCase().includes(query)))
      && this.config().filters.every((filter) => !this.filters()[filter.key] || record[filter.key] === this.filters()[filter.key]),
    );
  }

  get paginatedRecords(): DirectoryRecord[] {
    const start = (this.page() - 1) * this.pageSize;
    return this.filteredRecords.slice(start, start + this.pageSize);
  }

  get pageSize(): number {
    return this.config().pageSize ?? 5;
  }

  get pageCount(): number {
    return Math.max(1, Math.ceil(this.filteredRecords.length / this.pageSize));
  }

  get pageStart(): number {
    return this.filteredRecords.length ? (this.page() - 1) * this.pageSize + 1 : 0;
  }

  get pageEnd(): number {
    return Math.min(this.page() * this.pageSize, this.filteredRecords.length);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.pageCount }, (_, index) => index + 1);
  }

  statValue(stat: DirectoryStat): string {
    const count = !stat.countKey || stat.countValue === undefined
      ? this.records().length
      : this.records().filter((record) => record[stat.countKey!] === stat.countValue).length;
    return new Intl.NumberFormat('id-ID').format(count);
  }

  initials(name: string): string {
    return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toLocaleUpperCase();
  }

  get selectedRecord(): DirectoryRecord | undefined {
    return this.records().find((record) => record['id'] === this.selectedId());
  }

  get deletingRecord(): DirectoryRecord | undefined {
    return this.records().find((record) => record['id'] === this.deletingId());
  }

  setFilter(key: string, value: string): void {
    this.filters.update((filters) => ({ ...filters, [key]: value }));
    this.page.set(1);
  }

  onSearchChange(value: string): void {
    this.search.set(value);
    this.page.set(1);
  }

  setPage(page: number): void {
    this.page.set(Math.min(Math.max(1, page), this.pageCount));
  }

  clearFilters(): void {
    this.filters.set({});
    this.page.set(1);
  }

  exportRecords(): void {
    const columns = this.config().columns.filter((column) => column.key !== 'rowNumber');
    const csvValue = (value: string | undefined): string => `"${(value ?? '').replaceAll('"', '""')}"`;
    const rows = [
      columns.map((column) => csvValue(column.label)).join(','),
      ...this.filteredRecords.map((record) => columns.map((column) => csvValue(record[column.key])).join(',')),
    ];
    const blob = new Blob([`\uFEFF${rows.join('\r\n')}`], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.config().idPrefix.toLocaleLowerCase()}-directory.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  openAdd(): void {
    this.editingId.set(null);
    this.draft = this.emptyDraft();
    this.formError.set('');
    this.modal.set('form');
  }

  openEdit(record: DirectoryRecord): void {
    this.editingId.set(record['id']);
    this.draft = { ...record };
    this.formError.set('');
    this.modal.set('form');
  }

  openDetails(record: DirectoryRecord): void {
    this.selectedId.set(record['id']);
    this.modal.set('detail');
  }

  openDelete(id: string): void {
    this.deletingId.set(id);
    this.modal.set('delete');
  }

  closeModal(): void {
    this.modal.set('closed');
    this.formError.set('');
    this.editingId.set(null);
    this.selectedId.set(null);
    this.deletingId.set(null);
  }

  submit(): void {
    const normalized: DirectoryRecord = Object.fromEntries(
      Object.entries(this.draft).map(([key, value]) => [key, value.trim()]),
    );
    const missingField = this.config().fields.find((field) => field.required && !normalized[field.key]);
    if (missingField) {
      this.formError.set(`${missingField.label} wajib diisi.`);
      return;
    }
    const editingId = this.editingId();
    if (editingId) {
      this.records.update((records) => records.map((record) =>
        record['id'] === editingId ? { ...normalized, id: editingId } : record,
      ));
    } else {
      normalized['id'] = this.nextId();
      this.records.update((records) => [normalized, ...records]);
    }
    this.page.set(1);
    this.closeModal();
  }

  deleteRecord(): void {
    const id = this.deletingId();
    if (id) this.records.update((records) => records.filter((record) => record['id'] !== id));
    this.setPage(this.page());
    this.closeModal();
  }

  private emptyDraft(): DirectoryRecord {
    return Object.fromEntries([
      ['id', ''],
      ...this.config().fields.map((field) => [field.key, field.type === 'select' ? (field.options?.[0]?.value ?? '') : '']),
    ]);
  }

  private nextId(): string {
    const maxSequence = this.records().reduce((max, record) => {
      const sequence = Number(record['id'].match(/(\d+)$/)?.[1] ?? 0);
      return Math.max(max, sequence);
    }, 0);
    return `${this.config().idPrefix}-${String(maxSequence + 1).padStart(3, '0')}`;
  }
}
