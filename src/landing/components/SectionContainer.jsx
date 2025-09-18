export const SectionContainer = ({ children, className = "" }) => {
	return <div className={`max-w-[1620px] mx-auto px-5 ${className}`}>{children}</div>;
};
