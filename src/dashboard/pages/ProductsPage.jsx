import { useState } from "react";
import { ProductForm } from "../components/ProductForm";
import { ProductTable } from "../components/ProductsTable";

export const ProductsPage = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleSaved = () => {
        setSelectedProduct(null);
        setRefreshKey((prev) => prev + 1);
    }
    
    return (
        <section>
            <h2 className="font-title font-bold text-primary mb-4">Gestión de productos</h2>
            <p className="text-gray-600 mb-4">
                Desde aquí podrás añadir, editar o eliminar productos de tu tienda.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<ProductForm selectedProduct={selectedProduct} onSaved={handleSaved} />
				<ProductTable onEdit={setSelectedProduct} key={refreshKey} />
			</div>
        </section>
    )
}