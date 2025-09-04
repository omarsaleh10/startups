
import StartupForm from "@/app/components/startupform";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
    
export default async function CreateStartupPage(){
    const session = await auth();
    if(!session){
        
        redirect("/");
    }
    return (
        <>
            <section className="min-h-[10vh] bg-pink-500 relative overflow-hidden">
      {/* Orange vertical stripes pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(to right, transparent, transparent 4.5%, #f97316 4.5%, #f97316 5.5%, transparent 5.5%)',
          backgroundSize: '10% 100%'
        }}></div>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[10vh] px-6 py-20">
        <div className="bg-black px-8 py-6 mb-8 max-w-4xl text-center">
          <h1 className="text-white font-bold text-4xl sm:text-5xl lg:text-6xl uppercase leading-tight">
            Create Your Startup
          </h1>
        </div>
        
      </div>
      </section>
      <StartupForm />    
        </>
    )
}