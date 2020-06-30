export interface Upload {
    state: 'PENDING' | 'IN_PROGRESS' | 'DONE'
    progress: number
    content: Blob | null
}