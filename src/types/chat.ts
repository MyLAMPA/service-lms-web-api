
export type Room = {
    _id?: string
    ctx?: string
}

export type Message = {
    _id?: string
    room: string // string|Room
    content: string
}
