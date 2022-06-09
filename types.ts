export type NoteType = {
    "id": number,
    "title": string,
    "content": string,
    "content_type": string,
    "create_date": string,
    "author_id": number
}

export type UserType = {
    "username": string,
    "nickname": string,
    "avatar": string
}

export type UserState = {
    token: string,
    username: string,
    nickname: string,
    avatar: string,
    lastRefresh: string,  // Date.toLocaleString()的结果，避免无法序列化WARN
    status: 'idle' | 'loading' | 'failed';
}

export type NoteState = {
    notes: NoteType[],  // 使用Map类型方便根据id读取记事项
    lastRefresh: string, // 用于判断是否需要刷新数据
    status: 'idle' | 'loading' | 'failed';
}

export type LoginBody = {
    username: string,
    nickname: string,
    avatar: string,
    token: string,
    expires: string
}