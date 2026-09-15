export type TRole = 'admin' | 'agilist' | 'developer';

export type TAuthUser = {
    id: string;
    name: string;
    role: TRole;
}