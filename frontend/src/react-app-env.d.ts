/// <reference types="react-scripts" />

interface Prop<Type> {
    data: Type
}

interface CardInfo {
    title: string,
    description?: string | undefined,
    meta?: string | undefined,
    tags?: string[] | undefined,
    imageUrl?: string | undefined,
    color?: string | undefined,
    height?: number | undefined
}

interface ShowInfo {
    title: string,
    description: string,
    imageUrl?: string | undefined
}