import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'item';
}

export function createSku(value: string) {
  const cleaned = value
    .toUpperCase()
    .trim()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, 12);

  return cleaned || 'PRODUCT';
}

export async function generateUniqueSlug(Model: { findOne: (query: Record<string, unknown>) => { lean: () => Promise<unknown> } }, name: string, excludeId?: string) {
  const baseSlug = createSlug(name);
  let slug = baseSlug;
  let suffix = 1;

  while (true) {
    const existing = await Model.findOne({
      slug,
      ...(excludeId ? { _id: { $ne: excludeId } } : {}),
    }).lean();

    if (!existing) return slug;

    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
}

export async function generateUniqueSku(Model: { findOne: (query: Record<string, unknown>) => { lean: () => Promise<unknown> } }, name: string, excludeId?: string) {
  const baseSku = createSku(name);
  let sku = baseSku;
  let suffix = 1;

  while (true) {
    const existing = await Model.findOne({
      'variants.sku': sku,
      ...(excludeId ? { _id: { $ne: excludeId } } : {}),
    }).lean();

    if (!existing) return sku;

    sku = `${baseSku}-${suffix.toString().padStart(2, '0')}`;
    suffix += 1;
  }
}
