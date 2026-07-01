import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private readonly storage = signal<Storage | null>(typeof window !== 'undefined' ? window.localStorage : null);

  read<T>(key: string, fallback: T): T {
    const storage = this.storage();
    if (!storage) {
      return fallback;
    }

    const value = storage.getItem(key);
    if (!value) {
      return fallback;
    }

    try {
      return JSON.parse(value) as T;
    } catch {
      return fallback;
    }
  }

  write<T>(key: string, value: T): void {
    const storage = this.storage();
    if (!storage) {
      return;
    }

    storage.setItem(key, JSON.stringify(value));
  }

  remove(key: string): void {
    const storage = this.storage();
    if (!storage) {
      return;
    }

    storage.removeItem(key);
  }
}
