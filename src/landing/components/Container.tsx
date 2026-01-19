export const Container = ({ children, className = "" }) => {
	// console.log("Render Container")
	return <div className={`max-w-[1620] mx-auto ${className}`}>{children}</div>;
};
