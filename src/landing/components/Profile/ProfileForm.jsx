import { memo, useMemo } from "react";

export const ProfileForm = memo(
	({ formData, handleChange, handleSave, loading, error, success, inputClass, saveButton }) => {
		const statusMessage = useMemo(() => {
			if (error) return <p className="text-error">{error}</p>;
			if (success) return <p className="text-success">Perfil actualizado correctamente</p>;
			return null;
		}, [error, success]);

		console.log("Render ProfileForm");

		return (
			<form className="space-y-4" onSubmit={handleSave}>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-primary mb-1">Nombre</label>
						<input
							type="text"
							name="firstName"
							value={formData.firstName}
							onChange={handleChange}
							className={inputClass}
						/>
					</div>

					<div>
						<label className="block text-primary mb-1">Apellidos</label>
						<input
							type="text"
							name="lastName"
							value={formData.lastName}
							onChange={handleChange}
							className={inputClass}
						/>
					</div>
				</div>

				<div>
					<label className="block text-primary mb-1">Email</label>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className={inputClass}
					/>
				</div>

				<div>
					<label className="block text-primary mb-1">Teléfono</label>
					<input
						type="text"
						name="phone"
						value={formData.phone}
						onChange={handleChange}
						className={inputClass}
					/>
				</div>

				<div>
					<label className="block text-primary mb-1">Dirección</label>
					<input
						type="text"
						name="address"
						value={formData.address}
						onChange={handleChange}
						className={inputClass}
					/>
				</div>

				{statusMessage}

				<button type="submit" disabled={loading} className={saveButton}>
					{loading ? "Guardando..." : "Guardar cambios"}
				</button>
			</form>
		);
	}
);
