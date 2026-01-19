type ContainerProps = {
	children: string;
	className: string;
};

export const Container = ({ children, className = "" }: ContainerProps) => {
	// console.log("Render Container")
	return <div className={`max-w-[1620] mx-auto ${className}`}>{children}</div>;
};
