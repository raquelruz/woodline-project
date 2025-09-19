export const Container = ({ children, className = "" }) => {
	return <div className={`max-w-[1620] mx-auto ${className}`}>{children}</div>;
};
