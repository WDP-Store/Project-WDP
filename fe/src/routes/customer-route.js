import { Outlet } from 'react-router-dom';
import ErrorPage from '../pages/errorPage';
import { AuthorizationRoute } from './authorization-route';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import VnpayReturn from '../pages/VnpayReturn';
import Wishlist from '../pages/Wishlist';
import Layout from '../components/Layout';
import MyOrder from '../pages/MyOrder';
import { ProtectedRoute } from './protected-route';

export function customerRoutes() {
    return {
        path: '/',
        errorElement: <ErrorPage />,
        element: (
            <ProtectedRoute>
                <AuthorizationRoute roles={['customer']}>
                    <Layout>
                        <Outlet />
                    </Layout>
                </AuthorizationRoute>
            </ProtectedRoute>
        ),
        children: [
            { path: '/cart', element: <Cart /> },
            { path: '/checkout', element: <Checkout /> },
            { path: '/orders/vnpay-return', element: <VnpayReturn /> },
            { path: '/wishlist', element: <Wishlist /> },
            { path: '/myOrder', element: <MyOrder /> },
        ],
    };
}
