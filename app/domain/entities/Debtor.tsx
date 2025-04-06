export interface Debtor {
    id: number;
    name: string;
    debt: number;
}

export interface AddDebtorDTO {
    name: string;
    user: string;
}