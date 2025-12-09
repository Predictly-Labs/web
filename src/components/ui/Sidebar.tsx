import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { BsPeople } from 'react-icons/bs';
import { RiGiftLine } from 'react-icons/ri';

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  key: string;
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
    <button
      onClick={() => onClick(key)}
      className={`
        w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200
        ${isActive 
          ? 'bg-black text-white' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }
      `}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ activeMenu = 'home', onMenuClick = () => {} }) => {
  const menuItems: MenuItem[] = [
    { icon: AiOutlineHome, key: 'home' },
    { icon: HiOutlineShoppingBag, key: 'market' },
    { icon: BsPeople, key: 'groups' },
    { icon: RiGiftLine, key: 'rewards' }
  ];

  const menuItemsWithActive = menuItems.map(item => ({
    ...item,
    isActive: item.key === activeMenu
  }));

  return (
    <div className="fixed left-10 top-1/2 transform -translate-y-1/2 z-50">
      <div className="flex flex-col gap-3">
        {menuItemsWithActive.map(item => (
          <MenuItem
            key={item.key}
            item={item}
            onClick={onMenuClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;