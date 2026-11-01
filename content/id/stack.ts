import type { StackCategoryMeta, StackItem } from "../types";
import { stack as baseStack } from "../stack";

/** Urutan kategori yang dipakai seksi Alat. */
export const stackCategories: readonly StackCategoryMeta[] = [
  { id: "ml", index: "01", label: "Machine learning" },
  { id: "data", index: "02", label: "Data" },
  { id: "web", index: "03", label: "Web" },
  { id: "deployment", index: "04", label: "Deployment" },
  { id: "tools", index: "05", label: "Alat" },
];

const NOTES: Readonly<Record<string, string>> = {
  postgresql:
    "Sertifikat mencakup PostgreSQL; SQL tingkat proyek ada di aplikasi CodeIgniter/MySQL.",
};

/** Nama alat adalah nama produk, jadi hanya catatan yang diterjemahkan. */
export const stack: readonly StackItem[] = baseStack.map((item) => ({
  ...item,
  ...(NOTES[item.id] ? { note: NOTES[item.id] } : {}),
}));
