import { useForm } from "react-hook-form"; 
import { InputText } from "../component/ui/InputText";
import { Textarea } from "../component/ui/TextArea"; 
import { Select } from "../component/ui/Select"; 
import Button from "../component/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  nama: z.string().min(1, "Nama lengkap wajib diisi"),
  email: z.string().min(1, "Email wajib diisi").email("Format email tidak valid"),
  event: z.string().min(1, "Silakan pilih salah satu kompetisi/event"),
  bio: z.string().min(10, "Biodata singkat minimal berisi 10 karakter"),
});

type FormData = z.infer<typeof schema>;

export default function RegisterEventForm() { 
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  }); 
 
  const onSubmit = (data: FormData) => { 
    console.log("Data Pendaftaran Event:", data); 
    alert("Pendaftaran Event Berhasil!");
  };
 
  return (
    <div className="w-full bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-pink-800">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 tracking-wide">Registrasi Event</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4"> 
        <InputText
          label="Nama Lengkap" 
          nama="nama" 
          register={register("nama")} 
          error={errors.nama?.message} 
          placeholder="Masukkan nama lengkap"
        /> 
  
        <InputText
          label="Email Aktif" 
          nama="email" 
          register={register("email")} 
          error={errors.email?.message} 
          placeholder="nama@email.com"
        /> 

        <Select 
          label="Pilih Jenis Event" 
          nama="event" 
          register={register("event")} 
          options={[ 
            { label: "IT Competition (Lomba)", value: "comp" }, 
            { label: "IT Seminar Nasional", value: "semi" }, 
            { label: "IT Talkshow Interaktif", value: "talk" }, 
            { label: "IT Workshop Praktikal", value: "work" } 
          ]} 
          error={errors.event?.message} 
        /> 
  
        <Textarea 
          label="Biodata Singkat Peserta" 
          nama="bio" 
          register={register("bio")} 
          error={errors.bio?.message} 
          placeholder="Jelaskan instansi atau motivasi singkat mengikuti event ini..."
        /> 
  
        <Button label="Kirim Pendaftaran" variant="primary" type="submit" className="w-full mt-2" /> 
      </form> 
    </div>
  ); 
}