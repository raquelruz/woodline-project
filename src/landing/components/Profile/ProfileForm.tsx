import { memo, useMemo } from "react";
import { useTranslate } from "../../../translations/useTranslate";
import type { ProfileFormData } from "../../../core/types/profile.types";

type ProfileFormProps = {
	formData: ProfileFormData;
	handleChange: () => void;
	handleSave: () => void;
	loading: boolean;
	error?: string | null;
	success?: boolean;
	inputClass: string;
	saveButton: string;
};

export const ProfileForm = memo(
	({ formData, handleChange, handleSave, loading, error, success, inputClass, saveButton }: ProfileFormProps) => {
		const { t } = useTranslate();
		const statusMessage = useMemo(() => {
			if (error) return <p className="text-error">{error}</p>;
			if (success) return <p className="text-success">{t("auth.profile_update")}</p>;
			return null;
		}, [error, success]);

		return (
			<form className="space-y-4" onSubmit={handleSave}>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-primary mb-1">{t("auth.name")}</label>
						<input
							type="text"
							name="firstName"
							value={formData.firstName}
							onChange={handleChange}
							placeholder={t("auth.name")}
							className={inputClass}
						/>
					</div>

					<div>
						<label className="block text-primary mb-1">{t("auth.last_name")}</label>
						<input
							type="text"
							name="lastName"
							value={formData.lastName}
							onChange={handleChange}
							placeholder={t("auth.last_name")}
							className={inputClass}
						/>
					</div>
				</div>

				<div>
					<label className="block text-primary mb-1">{t("auth.email_label")}</label>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						placeholder={t("auth.last_name")}
						className={inputClass}
					/>
				</div>

				<div>
					<label className="block text-primary mb-1">{t("auth.phone")}</label>
					<input
						type="text"
						name="phone"
						value={formData.phone}
						onChange={handleChange}
						placeholder="123456789"
						className={inputClass}
					/>
				</div>

				<div>
					<label className="block text-primary mb-1">{t("auth.address")}</label>
					<input
						type="text"
						name="address"
						value={formData.address}
						onChange={handleChange}
						placeholder={t("auth.address")}
						className={inputClass}
					/>
				</div>

				{statusMessage}

				<button type="submit" disabled={loading} className={saveButton}>
					{loading ? t("common.saving") : t("common.save")}
				</button>
			</form>
		);
	},
);
