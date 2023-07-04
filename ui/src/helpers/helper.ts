export function deleteObjectFromMap<T>(map: Record<string, T>, id: string): Record<string, T> {
    const updatedMap: Record<string, T> = { ...map };
    if (id) {
        delete updatedMap[id];
    }
    return updatedMap;
}
