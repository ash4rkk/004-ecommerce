import React, { FC } from "react";
import Logo from "./Logo";
import { X } from "lucide-react";
import { DATA_headerData } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SocialMedia from "./SocialMedia";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  return (
    <div
      inert={!isOpen}
      className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`}
    >
      {/* Backdrop  */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ease-out ${isOpen ? "opacity-100" : "opacity-0"}`}
      />

      {/* Panel  */}
      <div
        className={`relative h-full min-w-72 max-w-96 bg-surface p-10 text-ink border-r border-r-accent-p flex flex-col gap-6 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between gap-5">
          <Logo className="text-ink" spanDesign="group-hover:text-ink" />
          <button
            className="transition-colors duration-200 ease-out hover:text-accent-p"
            onClick={onClose}
          >
            <X />
          </button>
        </div>

        <nav className="flex flex-col items-start space-y-3.5 font-semibold tracking-wide">
          {DATA_headerData?.map((item) => (
            <Link
              className={`transition-colors active:scale-95 duration-200 ease-out hover:text-accent-p ${pathname === item?.href && "text-accent-p"}`}
              href={item?.href}
              key={item?.title}
              onNavigate={onClose}
              
            >
              {item?.title}
            </Link>
          ))}
        </nav>
        <SocialMedia />
      </div>
    </div>
  );
};

export default SideMenu;
