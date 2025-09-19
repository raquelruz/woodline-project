import { Container } from "./Container";

export const SectionContainer = ({ bg, title, childrenContainerStyle, children }) => {
    return (
        <section className={`py-3xl ${bg}`}>
            <Container className="w-full flex flex-col justify-center md:gap-2xl gap-md">
                {title && <h2 className="text-center">{title}</h2>}
                <div className={`${childrenContainerStyle}`}>{children}</div>
            </Container>
        </section>
    );
};
