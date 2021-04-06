// Models
import { MenuItemModel } from '@core/models';

export const getMenuItems = (): MenuItemModel[] => {
  return [
    {
      name: 'Home',
      icon: 'home',
      requiresLogin: false,
      url: '/app'
    },
    {
      name: 'Markets',
      icon: 'timeline',
      requiresLogin: false,
      url: '/app/markets'
    },
    {
      name: 'Trackers',
      icon: 'insights',
      requiresLogin: true,
      url: '/app/trackers'
    },
    {
      name: 'Profile',
      icon: 'manage_accounts',
      requiresLogin: true,
      url: '/app/profile'
    }
  ];
};
