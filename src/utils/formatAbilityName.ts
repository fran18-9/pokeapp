export function formatAbilityName(name: string) {
    if (!name) return "";
    const formatted = name
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, c => c.toUpperCase());

    return formatted.trim();
}