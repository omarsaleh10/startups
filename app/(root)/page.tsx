import Hero from "@/app/components/hero";
import Cards from "@/app/components/cards";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";

export default async function Home({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const session = await auth();
  return (
    <main className="dark:bg-gray-900">
      <Hero/>
      <Cards searchParams={searchParams}/>
    </main>
  );
}