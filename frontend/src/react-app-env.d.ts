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
    height?: number | undefined,
    action?: () => void | undefined
}

interface ShowInfo {
    id: number,
    title: string,
    description?: string | undefined,
    imageUrl?: string | undefined
}

interface ShowtimeInfo {
    id: number,
    showid: number,
    date: Date,
    location: string
}