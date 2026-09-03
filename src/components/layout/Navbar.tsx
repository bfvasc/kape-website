import Link from "next/link";
import { basePath } from "@/lib/basePath";

export default function Navbar() {
  return (
    <header className="flex w-full items-center justify-between bg-white px-[120px] py-6">
      <div className="flex w-[121px] items-start">
        <span className="text-base font-bold text-kape-brown">Menu</span>
      </div>

      <Link href="/" className="flex w-[121px] items-center justify-center">
        <img src={`${basePath}/assets/logo/Logo.svg`} alt="Kapé" className="h-10 w-auto" />
      </Link>

      <div className="flex w-[121px] items-start justify-end">
        <span className="text-base font-bold text-kape-brown">Login</span>
      </div>
    </header>
  );
}
