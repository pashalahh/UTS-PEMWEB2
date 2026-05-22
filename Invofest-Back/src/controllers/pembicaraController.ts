import { Request, Response } from "express";
import { Pembicara } from "../types/pembicara.js";

let pembicara: Pembicara[] = [];

// 1. Menampilkan data pembicara
export const getPembicara = (req: Request, res: Response) => {
    res.json(pembicara);
};

// 2. Menyimpan data pembicara
export const createPembicara = (req: Request, res: Response) => {
    const { name, role, foto } = req.body;
        
            //  BUat validasi sederhana, jika name belum diisi
            if (!name || !role || !foto) {
                return res.status(500).json({ message: "Nama, role dan foto pembicara harus diisi" });
            }
        
            // Jika validasi berhasil
            const newPembicara: Pembicara = {
                id: Date.now(), // Menggunakan timestamp sebagai id unik
                name: name,
                role: role,
                foto: foto
            };
        
            // Jika sudah disusun, simpan ke array pembicara atau databse
            pembicara.push(newPembicara);
        
            // Jika data berhasil disimpan
            res.status(200).json({message: "Data berhasil disimpan", pembicara: newPembicara});
};

// 3. Menampilkan data pembicara berdasarkan id
export const showPembicaraById = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const pembicaraItem = pembicara.find((e) => e.id === id);
    if (!pembicaraItem) {
        return res.status(404).json({
            message: "Pembicara tidak ditemukan",
        });
    }
    res.json(pembicaraItem);
};

// 4. Mengupdate data pembicara berdasarkan id
export const updatePembicaraById = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const pembicaraItem = pembicara.find((e) => e.id === id);
    if (!pembicaraItem) {
        return res.status(404).json({ message: "Pembicara tidak ditemukan" });
    }
    pembicaraItem.name = req.body.name ?? pembicaraItem.name;
    pembicaraItem.role = req.body.role ?? pembicaraItem.role;
    pembicaraItem.foto = req.body.foto ?? pembicaraItem.foto;
    res.json(pembicaraItem);
};

// 5. Menghapus data pembicara berdasarkan id
export const deletePembicaraById = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    pembicara = pembicara.filter((e) => e.id !== id);
    res.json({ message: "Pembicara berhasil dihapus" });
};