import "./App.css";
import { Home } from "./landing/pages/Home";
import { Header } from "./landing/components/Navbar/Header";
import { Products } from "./landing/pages/Products";
import { About } from "./landing/pages/About";
import { Contact } from "./landing/pages/Contact";
import { Footer } from "./landing/sections/Footer";
import { Route, Routes } from "react-router-dom";
import { Login } from "./landing/pages/Login";
import { Register } from "./landing/pages/Register";
import { Users } from "./landing/pages/Users";
import { PrivateRoute } from "./landing/components/PrivateRoute";
import { Profile } from "./landing/pages/Profile";
import { CartPage } from "./landing/pages/CartPage";
import { Checkout } from "./landing/pages/Checkout";
import { OrderSuccessPage } from "./landing/pages/OrderSuccessPage";
import { OrderDetail } from "./landing/components/Orders/OrderDetail";
import { DashboardLayout } from "./dashboard/pages/DashboardLayout";
import { DashboardHome } from "./dashboard/pages/DashboardHome";
import { ProductsPage } from "./dashboard/pages/ProductsPage";
import { UsersPage } from "./dashboard/pages/UsersPage";
import { OrdersPage } from "./dashboard/pages/OrdersPage";
import { ShippingPage } from "./landing/pages/Help/ShippingPage";
import { ReturnsPage } from "./landing/pages/Help/ReturnsPage";
import { DeliveryTimePage } from "./landing/pages/Help/DeliveryTimePage";
import { TermsPage } from "./landing/pages/Legal/TermsPage";
import { PrivacyPolicyPage } from "./landing/pages/Legal/PrivacyPolicyPage";
import { CookiesPolicyPage } from "./landing/pages/Legal/CookiesPolicyPage";
import { IndividualProduct } from "./landing/pages/IndividualProduct";
import { ProductDetail } from "./landing/components/Products/ProductsDetail";
import { Toaster } from "react-hot-toast";

export const App = () => {
	return (
		<div className="h-dvh min-h-screen grid-rows-[auto_1fr_80px] md:grid-rows-[auto_1fr_120px]">
			<Header />

			<main>
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
					<Route path="/users" element={<Users />} />

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
			</main>

			<div>
				<Footer />
			</div>
		</div>
	);
};
