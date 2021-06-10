
function fixDates(data: any) {
    for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'string' && isDate(value)) {
            data[key] = new Date(value);
        } else if (typeof value === 'object') {
            data[key] = fixDates(value);
        }
    }
    
    return data;
}

function isDate(string: string): boolean {
    return /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/.test(string);
}

export default fixDates;