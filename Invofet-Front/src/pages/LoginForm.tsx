import { useForm } from "react-hook-form";
import { InputText } from "../component/ui/InputText";
import { InputPassword } from "../component/ui/InputPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "../component/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/UseAuthStore";

const schema = z.object({
  email: z.string().min(1, "Email : 24090070").email("Format email tidak valid"),
  password: z.string().min(8, "Password : 24090070"),
});

// Mengambil tipe langsung dari skema Zod agar otomatis sinkron
type FormData = z.infer<typeof schema>;

export default function LoginForm() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onsubmit = (data: FormData) => {
    console.log("Login Data:", data);
    // Contoh validasi statis menggunakan NIM / kredensial dummy mahasiswa
    if (data.email === "24090070" && data.password === "24090070") {
      alert("Login berhasil!");
      login(data.email); 
      navigate("/dashboard");
    } else {
      alert("Email atau password salah!");
    }
  };

  return (
    <div className="w-full bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-pink-800">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 tracking-wide">Login</h2>
      <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-1">
        <InputText 
          label="Email" 
          nama="email"
          register={register}
          error={errors.email?.message}
          placeholder="contoh@student.ac.id"
        />

        <InputPassword 
          label="Password"
          nama="password"
          register={register} 
          error={errors.password?.message}
          placeholder="Masukkan password Anda"
        />

        <div className="mt-3">
          <Button label="Login" variant="primary" type="submit" className="w-full" />
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          Belum punya akun? <Link to="/register" className="text-pink-800 font-semibold hover:underline">Daftar disini</Link>
        </div>
      </form>
    </div>
  );
}