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

