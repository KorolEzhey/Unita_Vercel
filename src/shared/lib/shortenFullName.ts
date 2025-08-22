export function shortenFullName(fullName: string): string {
    if (!fullName) return "";

    const parts = fullName.trim().split(/\s+/);

    if (parts.length >= 3) {
        const [lastName, firstName, middleName] = parts;
        return `${lastName} ${firstName[0]}. ${middleName[0]}.`;
    }

    if (parts.length === 2) {
        const [lastName, firstName] = parts;
        return `${lastName} ${firstName[0]}.`;
    }

    return fullName;
}
