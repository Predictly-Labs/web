"use client";

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { AiOutlineHome } from 'react-icons/ai';
import { TbChartCandle } from 'react-icons/tb';
import { BsPeople } from 'react-icons/bs';
import { MdOutlineWorkspacePremium } from 'react-icons/md';
import { HiOutlineUser } from 'react-icons/hi2';

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  key: string;
  route: string;
  isActive?: boolean;
}

interface MenuItemProps {
  item: MenuItem;
  onClick: (key: string) => void;
}

interface SidebarProps {
  activeMenu?: string;
  onMenuClick?: (key: string) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, onClick }) => {
  const { icon: Icon, key, isActive } = item;
  
  return (
    <motion.button
      onClick={() => onClick(key)}
      className={`
        w-12 h-12 rounded-full flex items-center justify-center cursor-pointer relative
        ${isActive 
          ? 'bg-white/90 backdrop-blur-sm text-gray-800 shadow-lg border border-white/20' 
          : 'bg-white/30 backdrop-blur-sm text-gray-600 hover:bg-white/50 border border-white/10'
        }
      `}
      whileHover={{ 
        scale: 1.05,
        y: -2
      }}
      whileTap={{ 
        scale: 0.95 
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
    >
      <motion.div
        animate={isActive ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Icon className="w-5 h-5" />
      </motion.div>
    </motion.button>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ activeMenu, onMenuClick }) => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    { icon: AiOutlineHome, key: 'home', route: '/app/dashboard' },
    { icon: TbChartCandle, key: 'market', route: '/app/create-market' },
    { icon: BsPeople, key: 'groups', route: '/app/groups' },
    { icon: MdOutlineWorkspacePremium, key: 'subscriptions', route: '/app/subscriptions' },
    { icon: HiOutlineUser, key: 'profile', route: '/app/profile' },
  ];

  const handleMenuClick = (key: string) => {
    const menuItem = menuItems.find(item => item.key === key);
    if (menuItem) {
      router.push(menuItem.route);
    }
    onMenuClick?.(key);
  };

  const menuItemsWithActive = menuItems.map(item => ({
    ...item,
    isActive: activeMenu ? item.key === activeMenu : pathname.includes(item.route)
  }));

  const activeIndex = menuItemsWithActive.findIndex(item => item.isActive);

  return (
    <motion.div 
      className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 ml-10"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="p-4 rounded-3xl backdrop-blur-sm relative overflow-hidden shadow-xl"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: "url('/assets/main/background/bg-nav.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        
        <div className="flex flex-col gap-3 relative z-10">
          {menuItemsWithActive.map((item, index) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.1 
              }}
            >
              <MenuItem
                item={item}
                onClick={handleMenuClick}
              />
            </motion.div>
          ))}
          
          <motion.div
            className="absolute w-12 h-12"
            animate={{
              y: activeIndex * (48 + 12) // 48px height + 12px gap
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            style={{
              left: 0,
              top: 0,
              zIndex: -1
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;