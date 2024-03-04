export const retryOnError = async (fn: () => Promise<any>, retries = 3): Promise<any> => {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (error) {
            console.error(`Attempt ${i + 1} failed. Retrying...`);
        }
    }
    throw new Error('All attempts failed');
}
