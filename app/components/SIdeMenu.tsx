import React from 'react';
import { HomeIcon, UserIcon, CogIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const SideMenu: React.FC = () => {
  return (
    <div className="fixed top-1/2 transform -translate-y-1/2 left-0 w-16 text-white flex flex-col items-center py-4 z-50">
      <div className="group flex flex-col items-center mb-6">
        <HomeIcon className="h-8 w-8 text-white transition-transform transform group-hover:scale-150 group-hover:text-blue-400" />
        <span className="text-xs mt-2 hidden group-hover:block">Home</span>
      </div>
      <div className="group flex flex-col items-center mb-6">
        <UserIcon className="h-8 w-8 text-white transition-transform transform group-hover:scale-150 group-hover:text-blue-400" />
        <span className="text-xs mt-2 hidden group-hover:block">Profile</span>
      </div>
      <div className="group flex flex-col items-center mb-6">
        <CogIcon className="h-8 w-8 text-white transition-transform transform group-hover:scale-150 group-hover:text-blue-400" />
        <span className="text-xs mt-2 hidden group-hover:block">Settings</span>
      </div>
      <div className="group flex flex-col items-center">
        <InformationCircleIcon className="h-6 w-6 text-white transition-transform transform group-hover:scale-150 group-hover:text-blue-400" />
        <span className="text-xs mt-2 hidden group-hover:block">Info</span>
      </div>
    </div>
  );
};

export default SideMenu;
