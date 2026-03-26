export interface NewsItem {
    id: number,
    title: string,
    imageUrl: string,
    summary: string,
    time: string,
    source: string,
    link: string,
    important: boolean,
    category: string,
    language: string,
    state: string,
    country: string
    isLatest: boolean
}