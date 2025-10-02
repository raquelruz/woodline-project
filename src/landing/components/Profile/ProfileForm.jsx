export const ProfileForm = ({
	formData,
	handleChange,
	handleSave,
	loading,
	error,
	success,
	inputClass,
	saveButton,
}) => {
	return (
		<form className="space-y-4" onSubmit={handleSave}>
			<div className="grid grid-cols-2 gap-4">
				<div>
					<label className="block text-primary-hover mb-1">Nombre</label>
					<input
						type="text"
						name="firstName"
						value={formData.firstName}
						onChange={handleChange}
						className={inputClass}
					/>
				</div>
				<div>
					<label className="block text-primary-hover mb-1">Apellidos</label>
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
				<label className="block text-primary-hover mb-1">Email</label>
				<input
					type="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					className={inputClass}
				/>
			</div>

			<div>
				<label className="block text-primary-hover mb-1">Teléfono</label>
				<input type="text" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} />
			</div>

			<div>
				<label className="block text-primary-hover mb-1">Dirección</label>
				<input
					type="text"
					name="address"
					value={formData.address}
					onChange={handleChange}
					className={inputClass}
				/>
			</div>

			{error && <p className="text-red-500">{error}</p>}
			{success && <p className="text-green-500">Perfil actualizado correctamente</p>}

			<button type="submit" disabled={loading} className={saveButton}>
				{loading ? "Guardando..." : "Guardar cambios"}
			</button>
		</form>
	);
};
