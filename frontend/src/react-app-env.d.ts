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
    action?: () => void
}

interface ShowInfo {
    id: number,
    title: string,
    description?: string,
    imageUrl?: string
}

interface ShowtimeInfo {
    id: number,
    showid: number,
    date: Date,
    location: string
}