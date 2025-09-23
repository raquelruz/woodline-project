export const Input = ({ ...props }) => {
    return (
        <input
            {...props}
            className={`bg-white border text-primary-pressed text-landing-lg placeholder:text-primary-hover rounded-xl py-3 px-6 focus:outline-none focus:ring-2 transition ${props.className}`}
        />
    );
};
