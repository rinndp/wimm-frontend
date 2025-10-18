
export interface Credit {
    id: number;
    description: string;
    credit: number;
    updated_at: string;
}

export interface AddCreditDTO {
    description: string;
    credit: number;
    creditor: number
}