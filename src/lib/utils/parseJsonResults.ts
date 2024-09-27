/**
 * Parses JSON fields within an object where fields are stored as JSON strings.
 * This function recursively processes nested objects and arrays.
 * @param data The object containing fields that need parsing.
 * @returns A new object with JSON fields parsed.
 */
const parseJsonResults = (data: any): any => {
    if (Array.isArray(data)) {
        return data.map(item => parseJsonResults(item));
    }
  
    if (data && typeof data === 'object') {
        const parsedData: any = { ...data };
  
        Object.keys(parsedData).forEach((key) => {
            const value = parsedData[key];
            if (typeof value === 'string' && (value.startsWith('{') || value.startsWith('['))) {
                try {
                    parsedData[key] = parseJsonResults(JSON.parse(value));
                } catch (error) {
                    // Handle parsing error if needed
                    console.error(`Failed to parse JSON in field ${key}:`, error);
                }
            } else if (typeof value === 'object' && value !== null) {
                parsedData[key] = parseJsonResults(value);
            }
        });
  
        return parsedData;
    }
  
    return data;
}

export default parseJsonResults;
