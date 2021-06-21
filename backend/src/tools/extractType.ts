import errors from './errors';

function extract(object: Record<string, unknown>, model: any): any {
    const result: any = {};
    Object.keys(model).forEach(key => {
        if (object[key] === undefined)
            throw errors.invalidData + ', missing key \'' + key + '\'';
        result[key] = object[key];
    });
    return result;
}

export default extract;
