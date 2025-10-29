// src/components/common/CustomToaster.jsx
import { Toaster } from "react-hot-toast";

export const CustomToaster = () => {
	return (
		<Toaster
			position="top-center"
			toastOptions={{
				style: {
					background: "#07484a",
					color: "#fff",
					borderRadius: "10px",
					fontFamily: "var(--font-landing)",
				},
				success: {
					iconTheme: { primary: "#3a7d3a", secondary: "#fff" },
				},
				error: {
					iconTheme: { primary: "#a23e48", secondary: "#fff" },
				},
			}}
		/>
	);
};
