import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import { ErrorBoundary } from "./landing/components/ErrorBoundary.jsx";
import { PageError } from "./landing/components/PageError.jsx";

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
				<CartProvider>
					<App />
				</CartProvider>
			</AuthProvider>
		</BrowserRouter>
	</ErrorBoundary>
);
