export function toUrlParam(obj) {
    if (URLSearchParams) {
        const p = new URLSearchParams(obj);
        return p.toString();
    }
    return Object.entries(obj)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');
}