import { Request, Response } from "express";
import { prisma } from "../lib/db.js";
import { Pembicara } from "../types/pembicara.js";

const pembicara : Pembicara[] = [];

// 1. Menampilkan data pembicara dari Supabase
export const getPembicara = async (req: Request, res: Response) => {
    try {
        const dataPembicara = await prisma.pembicara.findMany();
        res.json(dataPembicara);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data pembicara", error });
    }
};

// 2. Menyimpan data pembicara ke Supabase
export const createPembicara = async (req: Request, res: Response) => {
    const { name, role, image } = req.body;
        
    // Validasi sederhana
    if (!name || !role || !image) {
        return res.status(400).json({ message: "Nama, role dan image pembicara harus diisi" });
    }
        
    try {
        // Simpan permanen ke Supabase lewat Prisma
        const newPembicara = await prisma.pembicara.create({
            data: {
                name: name,
                role: role,
                image: image
            }
        });
    
        res.status(200).json({ message: "Data berhasil disimpan", pembicara: newPembicara });
    } catch (error) {
        res.status(500).json({ message: "Gagal menyimpan data ke database", error });
    }
};

// 3. Menampilkan data pembicara berdasarkan id
export const showPembicaraById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const pembicaraItem = await prisma.pembicara.findUnique({
            where: { id: id }
        });

        if (!pembicaraItem) {
            return res.status(404).json({ message: "Pembicara tidak ditemukan" });
        }
        res.json(pembicaraItem);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data", error });
    }
};

// 4. Mengupdate data pembicara berdasarkan id
export const updatePembicaraById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { name, role, image } = req.body;

    try {
        const updatedPembicara = await prisma.pembicara.update({
            where: { id: id },
            data: {
                name: name ?? undefined,
                role: role ?? undefined,
                image: image ?? undefined
            }
        });
        res.json(updatedPembicara);
    } catch (error) {
        res.status(404).json({ message: "Pembicara tidak ditemukan atau gagal diupdate" });
    }
};

// 5. Menghapus data pembicara berdasarkan id
export const deletePembicaraById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        await prisma.pembicara.delete({
            where: { id: id }
        });
        res.json({ message: "Pembicara berhasil dihapus" });
    } catch (error) {
        res.status(404).json({ message: "Pembicara tidak ditemukan atau gagal dihapus" });
    }
};