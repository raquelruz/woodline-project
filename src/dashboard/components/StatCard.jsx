export const StatCard = ({ title, value }) => {
    <div className="bg-white rounded-xl shadow-md p-6 text-center">
        <h3 className="text-gray-500 text-sm font-semibold">{title}</h3>
        <p className="text-3xl font-bold text-primary mt-2">{value}</p>
    </div>
}