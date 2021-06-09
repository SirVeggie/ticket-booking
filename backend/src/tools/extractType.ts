import errors from './errors';

function extract(object: Record<string, unknown>, model: any): any {
    const result = {};
    Object.keys(model).forEach(key => {
        if (!object[key])
            throw errors.invalidData;
        result[key] = object[key];
    });
    return result;
}

export default extract;
