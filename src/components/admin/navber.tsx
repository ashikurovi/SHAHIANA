import Link from "next/link";
import Image from "next/image";

export default function Navber() {
  return (
    <header className="flex h-[72px] items-center gap-4 border-b border-slate-200 bg-white px-6 md:px-8">
      <Link href="/dotadmin" className="lg:hidden flex items-center gap-2">
        <Image src="/logo.png" alt="Shahiana" width={34} height={34} className="object-contain" />
        <span className="text-base font-black uppercase tracking-tight text-[#760604]">Shahiana</span>
      </Link>
      <div className="w-full flex-1">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="relative">
            <input
              type="search"
              placeholder="SEARCH ADMIN..."
              className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-4 pr-4 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#760604]/20 focus:border-[#760604] md:w-2/3 lg:w-1/3 transition-all font-medium"
            />
          </div>
        </form>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/" target="_blank" className="text-xs font-bold uppercase tracking-wider text-[#760604] hover:text-[#590403] px-3 py-1.5 rounded-lg border border-[#760604]/30 hover:bg-[#760604]/5 transition-colors hidden sm:block">
          View Store
        </Link>
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#760604] to-[#E69A06] text-sm font-black text-white shadow-sm ring-2 ring-[#E69A06]/30">
          R
        </button>
      </div>
    </header>
  );
}
