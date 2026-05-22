import { Request, Response } from "express";
import { prisma } from "../lib/db.js";

// 1. Menampilkan data event (Ditambah include agar data nama Kategori & Pembicara ikut terbawa)
export const getEvents = async (req: Request, res: Response) => {
    try {
        const events = await prisma.event.findMany({
            include: {
                category: true,   // Membawa relasi kategori
                pembicara: true,  // Membawa relasi pembicara
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        res.json(events);
    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil data event",
            error,
        });
    }
};

// 2. Menyimpan data event (Ditambahkan field pembicaraId)
export const createEvent = async (req: Request, res: Response) => {
    try {
        const { name, categoryId, pembicaraId, location, dateEvent, description } = req.body;

        // Validasi: pembicaraId sengaja tidak dimasukkan ke pengecekan ini karena sifatnya opsional (boleh null)
        if (!name || !categoryId || !location || !dateEvent || !description) {
            return res.status(400).json({ message: "Semua kolom wajib harus diisi" }); // Mengubah status ke 400 (Bad Request)
        }

        // Jika validasi berhasil
        const newEvent = await prisma.event.create({
            data: {
                name,
                location,
                dateEvent: new Date(dateEvent),
                description,
                categoryId: Number(categoryId), // Pastikan bertipe Number/Int sesuai skema database
                pembicaraId: pembicaraId ? Number(pembicaraId) : null, // Jika ada diisi angka, jika kosong diisi null
            },
        });

        res.status(201).json({
            message: "Event berhasil dibuat",
            data: newEvent,
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal membuat event",
            error,
        });
    }
};

// 3. Menampilkan data event berdasarkan id (Ditambah include agar detailnya lengkap)
export const showEventById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const event = await prisma.event.findUnique({
            where: { id },
            include: {
                category: true,
                pembicara: true,
            },
        });

        if (!event) {
            return res.status(404).json({
                message: "Event tidak ditemukan",
            });
        }

        res.json(event);
    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil detail event",
            error,
        });
    }
};

// 4. Mengupdate data event berdasarkan id (Ditambahkan field pembicaraId)
export const updateEventById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const existingEvent = await prisma.event.findUnique({
            where: { id },
        });

        if (!existingEvent) {
            return res.status(404).json({
                message: "Event tidak ditemukan",
            });
        }

        const { name, categoryId, pembicaraId, location, dateEvent, description } = req.body;
        
        const updatedEvent = await prisma.event.update({
            where: { id },
            data: {
                name: name ?? existingEvent.name,
                location: location ?? existingEvent.location,
                dateEvent: dateEvent ? new Date(dateEvent) : existingEvent.dateEvent,
                description: description ?? existingEvent.description,
                categoryId: categoryId ? Number(categoryId) : existingEvent.categoryId,
                // Logika update pembicara: jika dikirim data baru kita amankan tipenya, jika kosong biarkan bawaan lama
                pembicaraId: pembicaraId !== undefined ? (pembicaraId ? Number(pembicaraId) : null) : existingEvent.pembicaraId,
            },
        });

        res.json({
            message: "Event berhasil diupdate",
            data: updatedEvent,
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal update event",
            error,
        });
    }
};

// 5. Menghapus data event berdasarkan id (Sudah aman, tidak perlu diubah)
export const deleteEventById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const existingEvent = await prisma.event.findUnique({
            where: { id },
        });

        if (!existingEvent) {
            return res.status(404).json({
                message: "Event tidak ditemukan",
            });
        }
        
        await prisma.event.delete({
            where: { id },
        });

        res.json({
            message: "Event berhasil dihapus",
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal menghapus event",
            error,
        });
    }
};