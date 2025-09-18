export const Container = ({ children, className = "" }) => {
	return <div className={`max-w-[1620] mx-auto px-md ${className}`}>{children}</div>;
};
