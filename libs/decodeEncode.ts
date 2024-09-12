export class decodeEncode {
    async decode(data: string) {
        return atob(data);
    }

    async encode(data: string) {
        return btoa(data)
    }
}