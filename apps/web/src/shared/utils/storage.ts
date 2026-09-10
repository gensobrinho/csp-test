export class Storage {
    static async getItem(key: string) {
        return sessionStorage.getItem(key);
    }

    static setItem(key: string, value: string) {
        sessionStorage.setItem(key, value);
    }

    static removeItem(key: string) {
        sessionStorage.removeItem(key);
    }
}