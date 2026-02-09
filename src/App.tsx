import { lazy, Suspense } from "react";
import { Header } from "./landing/components/Navbar/Header";
import { Footer } from "./landing/sections/Footer";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./landing/components/PrivateRoute";
import { ErrorBoundary } from "./landing/components/ErrorBoundary";
import { PageError } from "./landing/components/PageError";
import { useAuthContext } from "./hooks/useAuthContext";
import { PageSpinner } from "./landing/components/PageSpinner";

const Home = lazy(() => import("./landing/pages/Home"));
const Products = lazy(() => import("./landing/pages/Products"));
const About = lazy(() => import("./landing/pages/About"));
const Contact = lazy(() => import("./landing/pages/Contact"));
const Login = lazy(() => import("./landing/pages/Login"));
const Register = lazy(() => import("./landing/pages/Register"));
const Profile = lazy(() => import("./landing/pages/Profile"));

const ShippingPage = lazy(() => import("./landing/pages/Help/ShippingPage"));
const ReturnsPage = lazy(() => import("./landing/pages/Help/ReturnsPage"));
const DeliveryTimePage = lazy(() => import("./landing/pages/Help/DeliveryTimePage"));
const CookiesPolicyPage = lazy(() => import("./landing/pages/Legal/CookiesPolicyPage"));
const PrivacyPolicyPage = lazy(() => import("./landing/pages/Legal/PrivacyPolicyPage"));
const TermsPage = lazy(() => import("./landing/pages/Legal/TermsPage"));

const IndividualProduct = lazy(() => import("./landing/pages/IndividualProduct"));
const ProductDetail = lazy(() => import("./landing/components/Products/ProductsDetail"));
const CartPage = lazy(() => import("./landing/pages/CartPage"));
const Checkout = lazy(() => import("./landing/pages/Checkout"));

const OrdersPage = lazy(() => import("./dashboard/pages/OrdersPage"));
const OrderDetail = lazy(() => import("./landing/components/Orders/OrderDetail"));
const OrderSuccessPage = lazy(() => import("./landing/pages/OrderSuccessPage"));

const DashboardLayout = lazy(() => import("./dashboard/pages/DashboardLayout"));
const DashboardHome = lazy(() => import("./dashboard/pages/DashboardHome"));
const ProductsPage = lazy(() => import("./dashboard/pages/ProductsPage"));
const UsersPage = lazy(() => import("./dashboard/pages/UsersPage"));

export const App = () => {
	const { loading } = useAuthContext();

	if (loading) {
		return <PageSpinner message="Cargando aplicación..." fullPage />;
	}

	return (
		<div className="h-dvh min-h-screen grid-rows-[auto_1fr_80px] md:grid-rows-[auto_1fr_120px]">
			<Header />

			<main>
				<ErrorBoundary
					fallback={
						<PageError
							title="Error en la navegación"
							message="Ha ocurrido un error al cargar esta página. Por favor, intenta navegar a otra sección."
							onRetry={() => window.location.reload()}
							fullPage
						/>
					}
				>
					<Suspense fallback={<PageSpinner message="Cargando página..." fullPage />}>
						<Routes>
							{/* Rutas públicas */}
							<Route path="/" element={<Home />} />
							<Route path="/products" element={<Products />} />
							<Route
								path="/products/:id"
								element={
									<IndividualProduct>
										<ProductDetail />
									</IndividualProduct>
								}
							/>
							<Route path="/about" element={<About />} />
							<Route path="/contact" element={<Contact />} />

							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />

							<Route path="/shipping" element={<ShippingPage />} />
							<Route path="/returns" element={<ReturnsPage />} />
							<Route path="/delivery-time" element={<DeliveryTimePage />} />

							<Route path="/terms" element={<TermsPage />} />
							<Route path="/privacy" element={<PrivacyPolicyPage />} />
							<Route path="/cookies" element={<CookiesPolicyPage />} />

							{/* Rutas privadas */}
							<Route
								path="/profile"
								element={
									<PrivateRoute>
										<Profile />
									</PrivateRoute>
								}
							/>
							<Route
								path="/cart"
								element={
									<PrivateRoute>
										<CartPage />
									</PrivateRoute>
								}
							/>
							<Route
								path="/checkout"
								element={
									<PrivateRoute>
										<Checkout />
									</PrivateRoute>
								}
							/>
							<Route
								path="/order-success"
								element={
									<PrivateRoute>
										<OrderSuccessPage />
									</PrivateRoute>
								}
							/>
							<Route path="/orders/:id" element={<OrderDetail />} />

							<Route
								path="/dashboard"
								element={
									<PrivateRoute role="admin">
										<DashboardLayout />
									</PrivateRoute>
								}
							>
								<Route
									index
									element={
										<PrivateRoute role="admin">
											<DashboardHome />
										</PrivateRoute>
									}
								/>
								<Route
									path="products"
									element={
										<PrivateRoute role="admin">
											<ProductsPage />
										</PrivateRoute>
									}
								/>
								<Route
									path="users"
									element={
										<PrivateRoute role="admin">
											<UsersPage />
										</PrivateRoute>
									}
								/>
								<Route
									path="orders"
									element={
										<PrivateRoute role="admin">
											<OrdersPage />
										</PrivateRoute>
									}
								/>
								<Route
									path="orders/:id"
									element={
										<PrivateRoute role="admin">
											<OrderDetail />
										</PrivateRoute>
									}
								/>
							</Route>
						</Routes>
					</Suspense>
				</ErrorBoundary>
			</main>

			<div>
				<Footer />
			</div>
		</div>
	);
};
