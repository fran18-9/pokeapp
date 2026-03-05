export function formatName(raw: string): string {
    if (!raw) return "";
    return raw
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, c => c.toUpperCase())
        .trim();
}