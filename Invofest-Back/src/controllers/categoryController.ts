import { Request, Response } from "express";
import { Category } from "../types/category";
import { prisma } from "../lib/db.js";

let categories: Category[] = [];

// 1. Menampilkan data category
export const getCategories = async(req: Request, res: Response) => {
    // mengambil data dari database
    try{
        // jika data berhasil diambil
        const allCategories = await prisma.category.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        res.json(allCategories);
    }catch(error){
        // jika error
        res.status(500).json({ message: "Gagal mengambil data category", error });
    }
};

// 2. Menyimpan data category
export const createCategory = async(req: Request, res: Response) => {
    const { name, createdAt } = req.body;
    
        //  BUat validasi sederhana, jika name belum diisi
        if (!name) {
            return res.status(500).json({ message: "Nama kategori harus diisi" });
        }
    
        // Jika validasi berhasil
        const newCategory = await prisma.category.create({
            data: {
                name,
                createdAt
            },
        });
        
        // Jika sudah disusun, simpan ke array categories atau databse
        categories.push(newCategory);
    
        // Jika data berhasil disimpan
        res.status(200).json({message: "Data berhasil disimpan", category: newCategory});
};

// 3. Menampilkan data category berdasarkan id
export const showCategoryById = async(req: Request, res: Response) => {
    const id = Number(req.params.id);
    const category = await prisma.category.findUnique({
        where: {
            id: id,
        },
    });
    if (!category) {
        return res.status(404).json({
            message: "Category tidak ditemukan",
        });
    }
    res.json(category);
};

// 4. Mengupdate data category berdasarkan id
export const updateCategoryById = async(req: Request, res: Response) => {
    const id = Number(req.params.id);
    const category = await prisma.category.findUnique({
        where: {
            id: id,
        },
    });
    if (!category) {
        return res.status(404).json({ message: "Category tidak ditemukan" });
    }
    const updatedCategory = await prisma.category.update({
        where: {
            id: id,
        },
        data: {
            name: req.body.name ?? category.name,
        },
    });
    res.json(updatedCategory);
};

// 5. Menghapus data category berdasarkan id
export const deleteCategoryById = async(req: Request, res: Response) => {
    const id = Number(req.params.id);
    await prisma.category.delete({
        where: {
            id: id,
        },
    });
    res.json({ message: "Category berhasil dihapus" });
};

