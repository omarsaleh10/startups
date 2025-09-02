import Hero from "@/app/components/hero";
import Cards from "@/app/components/cards";
import Link from "next/link";
import Image from "next/image";




export default function Home({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  return (
    <main>
      <Hero/>
      <Cards searchParams={searchParams}/>
    </main>
  );
}