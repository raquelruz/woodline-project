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

export const App = () => {
	return (
		<div className="h-dvh min-h-screen grid-rows-[auto_1fr_80px] md:grid-rows-[auto_1fr_120px]">
			<Header />

			<main>
				<Routes>
					{/* Rutas públicas */}
					<Route path="/" element={<Home />} />
					<Route path="/products" element={<Products />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/users" element={<Users />} />
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
						<Route index element={<DashboardHome />} />
					</Route>
				</Routes>
			</main>

			<div>
				<Footer />
			</div>
		</div>
	);
};
