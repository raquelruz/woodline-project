import { memo, useEffect, useState } from "react";
import { api } from "../../core/http/axios";
import { StatCard } from "../components/StatCard";
import { Loader } from "../../landing/components/Loader";
import { useTranslate } from "../../translations/useTranslate";

const DashboardHome = memo(() => {
	const { t } = useTranslate();
	const [stats, setStats] = useState({ products: 0, users: 0, orders: 0 });
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		fetchDashboardStats();
	}, []);

	const fetchDashboardStats = async () => {
		try {
			setLoading(true);
			setError("");

			const [productsRes, usersRes, ordersRes] = await Promise.all([
				api.get("/products"),
				api.get("/users"),
				api.get("/orders"),
			]);

			setStats({
				products: Array.isArray(productsRes.data) ? productsRes.data.length : 0,
				users: Array.isArray(usersRes.data) ? usersRes.data.length : 0,
				orders: Array.isArray(ordersRes.data) ? ordersRes.data.length : 0,
			});
		} catch (error) {
			// console.error("Error al cargar estadísticas:", error);
			setError(t("components.page_error.default_title"));
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<section className="flex flex-col items-center justify-center text-center">
				<h1 className="font-title text-3xl font-bold text-primary mb-3">{t("pages.dashboard.dashboard_title")}</h1>
				<p className="text-gray-600">
					{t("pages.dashboard.dashboard_subtitle")}
				</p>
				<Loader text={t("pages.dashboard.loading_statistics")} />
			</section>
		);
	}

	return (
		<section>
			<div className="text-center mb-8">
				<h1 className="font-title text-3xl font-bold text-primary mb-3">{t("pages.dashboard.dashboard_title")}</h1>
				<p className="text-gray-600">
					{t("pages.dashboard.dashboard_subtitle")}
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
				<StatCard title={t("pages.dashboard.products_stats")} value={stats.products} />
				<StatCard title={t("pages.dashboard.users_stats")} value={stats.users} />
				<StatCard title={t("pages.dashboard.orders_stats")} value={stats.orders} />
			</div>
		</section>
	);
});

export default DashboardHome;