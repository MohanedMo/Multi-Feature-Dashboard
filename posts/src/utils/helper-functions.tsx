let debounceTimer: number | undefined;
export const debounce = (callback: () => void, durationInMs: number = 150) => {
    if (!callback) return;
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(callback, durationInMs);
};