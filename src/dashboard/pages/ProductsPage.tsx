import { memo, useState } from "react";
import { ProductForm } from "../components/ProductForm";
import { ProductTable } from "../components/ProductsTable";
import { useTranslate } from "../../translations/useTranslate";
import type { ProductWithBackendId } from "../../core/products/products.types";

const ProductsPage = memo(() => {
	const { t } = useTranslate();
	const [selectedProduct, setSelectedProduct] = useState<ProductWithBackendId | null>(null);
	const [refreshKey, setRefreshKey] = useState(0);

	const handleSaved = () => {
		setSelectedProduct(null);
		setRefreshKey((prev) => prev + 1);
	};

	return (
		<section>
			<h2 className="font-title text-center font-bold text-primary mb-4">{t("pages.dashboard.products_title")}</h2>
			<p className="text-gray-600 text-center mb-4">{t("pages.dashboard.products_description")}</p>

			<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
				<ProductForm selectedProduct={selectedProduct} onSaved={handleSaved} />
				<ProductTable onEdit={(product) => setSelectedProduct(product)} key={refreshKey} />
			</div>
		</section>
	);
});

export default ProductsPage;
