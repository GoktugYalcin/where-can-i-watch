export function GenerateQueryParams(obj: Record<string, string | number | boolean>): string {
    return '?'.concat(Object.entries(obj)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&'));
}