import React from 'react';
import { ApplicationRoute } from '.';
import { RouteHref } from './enum';
import {
  RiDashboardLine,
  RiGroupLine,
  RiListOrdered,
  RiQuestionLine,
} from 'react-icons/ri';
import { Role } from '@/app/constants';

const Dashboard = React.lazy(() => import('@/views/Dashboard'));
const OrderManagement = React.lazy(() => import('@/views/OrderManagement'));
const ProductManagement = React.lazy(() => import('@/views/ProductManagement'));
const UserManagement = React.lazy(() => import('@/views/UserManagement'));

const dashboardRoutes: ApplicationRoute[] = [
  {
    name: 'Dashboard',
    path: '',
    sidebar: true,
    icon: RiDashboardLine,
    roles: [Role.SHOP_WORKER, Role.SHOP_OWNER],
    href: RouteHref.DASHBOARD,
    element: <Dashboard />,
  },
  {
    name: 'Orders',
    path: 'orders',
    sidebar: true,
    icon: RiListOrdered,
    roles: [Role.SHOP_WORKER, Role.SHOP_OWNER],
    href: RouteHref.ORDER_MANAGEMENT,
    element: <OrderManagement />,
  },
  {
    name: 'Products',
    path: 'products',
    sidebar: true,
    icon: RiQuestionLine,
    roles: [Role.SHOP_WORKER, Role.SHOP_OWNER],
    href: RouteHref.PRODUCT_MANAGEMENT,
    element: <ProductManagement />,
  },
  {
    name: 'Users',
    path: 'users',
    sidebar: true,
    icon: RiGroupLine,
    roles: [Role.SHOP_OWNER],
    href: RouteHref.USER_MANAGEMENT,
    element: <UserManagement />,
  },
];

export default dashboardRoutes;
