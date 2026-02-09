import type { ReactNode } from "react";
import { Container } from "./Container";

type SectionContainerProps = {
    bg: string;
    title: string;
    childrenContainerStyle: string;
    children: ReactNode;
};

export const SectionContainer = ({ bg, title, childrenContainerStyle, children }: SectionContainerProps) => {
    return (
        <section className={`py-3xl ${bg}`}>
            <Container className="w-full flex flex-col justify-center md:gap-2xl gap-md px-md pb-md">
                {title && <h2 className="text-center">{title}</h2>}
                <div className={`${childrenContainerStyle}`}>{children}</div>
            </Container>
        </section>
    );
};
