import { Category } from "./category";
import { Pembicara } from "./pembicara";

export interface Event {
  id: number;
  name: string;
  location: string;
  dateEvent: Date | string;
  description: string;
  categoryId: number;
  pembicaraId: number | null; // Bisa null karena opsional
  createdAt: Date | string;

  // Menyertakan data relasi jika di-include oleh Prisma
  category?: Category;
  pembicara?: Pembicara | null;
}