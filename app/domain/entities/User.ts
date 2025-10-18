export interface LoggedUserInterface {
    slug: string;
    access_token?: string;
    refresh_token?: string;
    email?: string;
}

export interface LoginUserInterface {
    email: string;
    password: string;
}

export interface UserStatisticsInterface {
    number_of_debtors: number;
    total_debt: number;
    number_of_creditors: number;
    total_credit: number;
}

