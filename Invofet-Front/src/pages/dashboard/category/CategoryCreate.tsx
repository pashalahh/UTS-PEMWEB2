import Button from "../../../component/ui/Button";
import { InputText } from "../../../component/ui/InputText";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router"; 
import api from "../../../api/axiosInstance"; 
import { useState } from "react";

export default function CategoryCreate() {
    const navigate = useNavigate(); // Inisialisasi fungsi navigate
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [serverError, setServerError] = useState<string | null>(null);

    type FormData = {
        category: string;
    }
    
    const schema = z.object({
        category: z.string().min(2, "Nama kategori harus diisi")
    });
    
    // 3. Ubah fungsi onsubmit menjadi async-await untuk handle Axios POST
    const onsubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setServerError(null);

        try {
            // Tembak API POST ke /categories
            await api.post("/categories", {
                name: data.category 
            });

            // Jika sukses disimpan, langsung balik ke halaman index category
            navigate("/dashboard/category"); 
        } catch (error: any) {
            console.error("Gagal menambah kategori:", error);
            setServerError(
                error.response?.data?.message || "Terjadi kesalahan pada server. Coba lagi."
            );
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    return (
        <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-pink-800">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Tambah Kategori</h2>
            
            {/* Tampilkan error dari server jika ada */}
            {serverError && (
                <div className="p-3 mb-4 text-sm text-red-800 bg-red-100 rounded-lg">
                    {serverError}
                </div>
            )}

            <form onSubmit={handleSubmit(onsubmit)}>
                <InputText 
                    label="Nama Kategori" 
                    nama="category"
                    register={register}
                    error={errors.category?.message}
                />

                <div className="mt-4">
                    <Button 
                        type="submit" // <-- WAJIB DITAMBAHKAN AGAR FORM BISA DI-SUBMIT 
                        label={isSubmitting ? "Menyimpan..." : "Simpan"} 
                        variant="primary" 
                        className="flex-1 mt-0 cursor-pointer disabled:bg-gray-400" 
                        disabled={isSubmitting}
                    />
                </div>
            </form>
        </div>
    );
}