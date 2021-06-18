/// <reference types="react-scripts" />

interface Prop<Type> {
    data: Type
}

interface CardInfo {
    title: string,
    description?: string,
    meta?: string,
    tags?: string[],
    imageUrl?: string,
    color?: string,
    height?: number,
    disabled?: boolean,
    disabledMsg?: string,
    action?: () => void
}

type FormSubmit = (event: React.FormEvent<HTMLFormElement>) => void;