import { useForm } from "react-hook-form";
import { InputText } from "../component/ui/InputText";
import { InputPassword } from "../component/ui/InputPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "../component/ui/Button";
import { Link } from "react-router-dom";

const schema = z.object({
  nama: z.string().min(1, "Nama lengkap harus diisi"),
  email: z.string().min(1, "Email harus diisi").email("Format email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
  password_confirm: z.string().min(8, "Konfirmasi password minimal 8 karakter"),
}).refine((data) => data.password === data.password_confirm, {
  message: "Konfirmasi password tidak cocok dengan password utama",
  path: ["password_confirm"], 
});

type FormData = z.infer<typeof schema>;

export default function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onsubmit = (data: FormData) => {
    console.log("Registrasi Akun Berhasil:", data);
    alert("Akun berhasil dibuat! Silakan masuk halaman login.");
  };

  return (
    <div className="w-full bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-pink-800">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 tracking-wide">Form Registrasi</h2>
      <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-1">
        <InputText 
          label="Nama Lengkap" 
          nama="nama"
          register={register}
          error={errors.nama?.message}
          placeholder="Masukkan nama lengkap Anda"
        />
         
        <InputText 
          label="Email" 
          nama="email"
          register={register}
          error={errors.email?.message}
          placeholder="alamat@email.com"
        />

        <InputPassword 
          label="Password"
          nama="password"
          register={register}
          error={errors.password?.message}
          placeholder="Buat password aman"
        />

        <InputPassword 
          label="Konfirmasi Password"
          nama="password_confirm"
          register={register}
          error={errors.password_confirm?.message}
          placeholder="Ulangi password di atas"
        />

        <div className="mt-3">
          <Button label="Buat Akun Baru" variant="primary" type="submit" className="w-full" />
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          Sudah punya akun? <Link to="/login" className="text-pink-800 font-semibold hover:underline">Login disini</Link>
        </div>
      </form>
    </div>
  );
}