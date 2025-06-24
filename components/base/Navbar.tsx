"use client";

import React from "react";
import { motion } from "motion/react";
import { Home } from "lucide-react";
import Logo from "./Logo";
import { ModeToggle } from "@/components/provider/theme-toggle";

export default function Navbar() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-b border-border z-50 group"
      initial={{ y: -48 }}
      whileHover={{ y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      {/* iPhone-like Trigger Bar */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-3 rounded-full cursor-pointer bg-foreground/20 dark:bg-foreground/20 transition-colors duration-300 flex items-center justify-center shadow-md">
        <div className="w-24 h-1 rounded-full mx-auto mt-0 bg-foreground/60 dark:bg-foreground/60 opacity-70 transition-colors duration-300" />
      </div>

      {/* Navbar Content - hidden until hover */}
      <div className="flex items-center justify-between h-full px-8 opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 group-hover:pointer-events-auto">
        {/* Logo/Brand */}
        <div>
          <Logo size="sm" showText={true} className="text-foreground" />
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-8">
          <NavItem icon={<Home size={20} />} label="Home" href="/" />
          <ModeToggle />
        </div>
      </div>

      {/* Hover Indicator */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-3 rounded-full bg-foreground/10 dark:bg-foreground/10"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      />
    </motion.nav>
  );
}

// NavItem Component
function NavItem({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) {
  return (
    <motion.a
      href={href}
      className="relative group/nav w-10 h-10 bg-muted/50 hover:bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-200"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}

      {/* Tooltip */}
      <motion.div
        className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 pointer-events-none border border-border shadow-lg"
        initial={{ opacity: 0, y: -10 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {label}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-popover border-l border-b border-border rotate-45" />
      </motion.div>
    </motion.a>
  );
}
