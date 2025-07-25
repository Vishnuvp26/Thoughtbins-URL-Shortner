export function isValidUrl(url: string): boolean {
    try {
        const parsedUrl = new URL(url);

        const isHttp = parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
        const hasHostname = Boolean(parsedUrl.hostname);

        return isHttp && hasHostname;
    } catch {
        return false;
    }
}