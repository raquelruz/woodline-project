import { useState } from "react";
import { UserForm } from "../components/UserForm";
import { UserTable } from "../components/UserTable";

export const UsersPage = () => {
    const [selectedUser, setSelectedUser] = useState(null);

    const handleUserSaved = () => {
        window.location.reload();
    }

	return (
		<section>
			<h2 className="font-title text-center font-bold text-primary mb-4">Gestión de usuarios</h2>
			<p className="text-gray-600 text-center mb-4">Desde aquí podrás añadir, editar o eliminar usuarios de tu página.</p>

			<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
				<UserForm selectedUser={selectedUser} onSaved={handleUserSaved} />
                <UserTable onEdit={setSelectedUser} />
			</div>
		</section>
	);
};