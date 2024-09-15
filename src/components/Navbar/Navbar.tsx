"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-100 dark:bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link
            href="/"
            className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === "/" ? "bg-blue-500 text-white" : "text-black dark:text-white"}`}
          >
            انتخاب تسهیلات
          </Link>
          <Link
            href="/loans"
            className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === "/loans" ? "bg-blue-500 text-white" : "text-black dark:text-white"}`}
          >
            مشاهده تسهیلات
          </Link>
        </div>
        {/* <ThemeToggle /> */}
      </div>
    </nav>
  );
}
