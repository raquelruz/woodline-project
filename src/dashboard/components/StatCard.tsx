type StatCardProps = {
	title: string;
	value: string | number;
}

export const StatCard = ({ title, value }: StatCardProps) => {
	return (
		<div className="bg-white rounded-xl shadow-md p-6 text-center">
			<h4 className="text-primary font-title text-sm font-semibold">{title}</h4>
			<p className="text-3xl font-bold text-primary mt-2">{value}</p>
		</div>
	);
};
