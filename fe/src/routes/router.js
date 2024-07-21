import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import { ProtectedRoute } from './protected-route';
import { AuthorizationRoute } from './authorization-route';
import { publicRoutes } from './public.route';
import { authRoutes } from './auth.route';
import adminRoutes from './admin.route';
import Error403Page from '../pages/error403.page';
import Error404Page from '../pages/error404.page';
import ErrorPage from '../pages/errorPage';
import { customerRoutes } from './customer-route';
import Layout from '../components/Layout';
import DefaultAdminLayout from '../admin/layouts/DefaultAdminLayout';
import Customer from '../admin/pages/Customer';
import Feedback from '../admin/pages/Feedback';
import Dashboard from '../admin/pages/DashBoard';
import Contact from '../admin/pages/Contact';
import Orders from '../admin/pages/Orders';
import OrdersManager from '../admin/pages/OrdersManager';
import Invoice from '../admin/pages/Invoice';
import Productlist from '../admin/pages/Productlist';
import ProductDetail from '../admin/pages/ProductDetail';
import EditProduct from '../admin/pages/EditProduct';
import AddProduct from '../admin/pages/Addproduct';
import Categorylist from '../admin/pages/Categorylist';
import Brandlist from '../admin/pages/Brandlist';
import Bloglist from '../admin/pages/Bloglist';
import Addblog from '../admin/pages/Addblog';
import BlogDetails from '../admin/pages/BlogDetail';
import EditBlog from '../admin/pages/EditBlog';
import StateContext from '../admin/pages/context/stateContext';
const allRoutes = createBrowserRouter([
  {
    path: '/admin',
    errorElement: <ErrorPage />,
    element: (
      <ProtectedRoute >
        <AuthorizationRoute roles={["admin"]}>
          <DefaultAdminLayout>
            <Outlet />
          </DefaultAdminLayout>
        </AuthorizationRoute>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to={'/admin'} /> },
      { path: '/admin/customer', element: <Customer /> },
      { path: '/admin/feedback', element: <Feedback /> },
      { path: '/admin/dashboard', element: <Dashboard /> },
      { path: '/admin/contact', element: <Contact /> },
      // { path: '/admin/order', element: <Orders /> },
      { path: '/admin/order', element: <OrdersManager /> },
      // { path: '/admin/order/:id', element: <Invoice /> }, 
      { path: '/admin/order/:id', element: <StateContext><Invoice /></StateContext> },

      //product
      { path: '/admin/product', element: <Productlist /> },
      { path: '/admin/product/:id', element: <ProductDetail /> },
      { path: '/admin/product/edit/:id', element: <EditProduct /> },
      { path: '/admin/product/add-product', element: <AddProduct /> },
      { path: '/admin/product/brand-list', element: <Brandlist /> },
      { path: '/admin/product/category-list', element: <Categorylist /> },

      //blog
      { path: '/admin/blogs', element: <Bloglist /> },
      { path: '/admin/blogs/:id', element: <BlogDetails /> },
      { path: '/admin/blogs/add-blog', element: <Addblog /> },
      { path: '/admin/blogs/edit/:id', element: <EditBlog /> },
    ],
  },
  customerRoutes(),
  publicRoutes(),
  authRoutes(),
  // adminRoutes(),
  { path: '/unauthorize', element: <Error403Page /> },
  { path: '*', element: <Error404Page /> },
]);

export const AppRouter = ({ children }) => (
  <>
    <RouterProvider router={allRoutes} />
    {children}
  </>
);
