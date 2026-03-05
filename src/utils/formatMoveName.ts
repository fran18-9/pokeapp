export function formatMoveName(name: string) {
    if (!name) return "";
    const formatted = name
        .replace(/[-_]/g, " ")

    return formatted.trim();
}