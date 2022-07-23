import errors from './errors';

export function extractType(object: Record<string, unknown>, model: any): any {
    const result: any = {};
    Object.keys(model).forEach(key => {
        if (model[key] !== undefined && object[key] === undefined)
            throw errors.invalidData + ', missing key \'' + key + '\'';
        result[key] = object[key];
    });
    return result;
}
