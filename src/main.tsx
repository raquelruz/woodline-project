import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { CartProvider } from "./contexts/CartContext";
import { ErrorBoundary } from "./landing/components/ErrorBoundary";
import { PageError } from "./landing/components/PageError";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { ViewedProvider } from "./contexts/ViewedContext";
import "./translations/i18n"

createRoot(document.getElementById("root")).render(
	<ErrorBoundary
		fallback={
			<PageError
				title="Error crítico en la aplicación"
				message="Ha ocurrido un error inesperado. Por favor, recarga la página."
				onRetry={() => window.location.reload()}
				retryText="Recargar página"
				fullPage
			/>
		}
	>
		<BrowserRouter>
			<AuthProvider>
				<FavoritesProvider>
					<ViewedProvider>
						<CartProvider>
							<App />
						</CartProvider>
					</ViewedProvider>
				</FavoritesProvider>
			</AuthProvider>
		</BrowserRouter>
	</ErrorBoundary>
);
