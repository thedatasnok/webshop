import React from 'react';
import { ApplicationRoute } from '.';
import { RouteHref } from './enum';
import { RiDashboardLine, RiGroupLine, RiListOrdered, RiQuestionLine } from 'react-icons/ri';

const Dashboard = React.lazy(() => import('@/views/Dashboard'));
const ItemManagement = React.lazy(() => import('@/views/ItemManagement'));
const OrderManagement = React.lazy(() => import('@/views/OrderManagement'));
const ProductManagement = React.lazy(() => import('@/views/ProductManagement'));
const UserManagement = React.lazy(() => import('@/views/UserManagement'));

const dashboardRoutes: ApplicationRoute[] = [
  {
    name: 'Dashboard',
    path: '',
    sidebar: true,
    icon: RiDashboardLine,
    href: RouteHref.DASHBOARD,
    element: <Dashboard />,
  },
  {
    name: 'Orders',
    path: 'orders',
    sidebar: true,
    icon: RiListOrdered,
    href: RouteHref.ORDER_MANAGEMENT,
    element: <OrderManagement />,
  },
  {
    name: 'Items',
    path: 'items',
    sidebar: true,
    icon: RiQuestionLine,
    href: RouteHref.ITEM_MANAGEMENT,
    element: <ItemManagement />,
  },
  {
    name: 'Products',
    path: 'products',
    sidebar: true,
    icon: RiQuestionLine,
    href: RouteHref.PRODUCT_MANAGEMENT,
    element: <ProductManagement />,
  },
  {
    name: 'Users',
    path: 'users',
    sidebar: true,
    icon: RiGroupLine,
    href: RouteHref.USER_MANAGEMENT,
    element: <UserManagement />,
  },
];

export default dashboardRoutes;
