

export interface Debt {
    id: number
    description: string
    debt: number
    updated_at: string
}

export interface AddDebtDTO {
    description: string
    debt: number
    debtor: number
}