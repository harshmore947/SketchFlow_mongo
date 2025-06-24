import React from "react";
import { Github } from "lucide-react";

function Footer() {
  return (
    <footer className="w-full py-6 bg-[#F8FAFC] border-t border-[#E5E7EB] mt-12 dark:bg-[#10131A] dark:border-[#23262F]">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex space-x-4 mb-1">
          <a
            href="https://github.com/harsh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#64748B] hover:text-[#1E293B] transition-colors dark:text-[#A3A9B7] dark:hover:text-[#F8FAFC]"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
        <div className="text-xs text-[#64748B] text-center dark:text-[#A3A9B7]">
          Made with <span className="text-red-500">❤️</span> by Harsh
        </div>
      </div>
    </footer>
  );
}

export default Footer;
