import errors from './tools/errors';

export function unknownEndpoint(req: any, res: any) {
    res.status(404).send('unknown endpoint');
}

export function errorHandler(error: any, req: any, res: any, next: any) {
    console.error('Error: ' + error);
    
    if (!error?.startsWith) {
        next(error);
        return;
    }
    
    if (error?.startsWith(errors.noData))
        return res.status(404).send('unknown endpoint');
    if (error?.startsWith(errors.invalidData))
        return res.status(400).send('Data provided was invalid');
    if (error?.startsWith(errors.illegalData))
        return res.status(400).send(errors.illegalData);
    if (error?.startsWith(errors.noAdmin))
        return res.status(401).send('Performed Admin action without proper admin token');
    if (error?.startsWith(errors.invalidIP))
        return res.status(401).send('Admin token was invalid');
    if (error?.startsWith(errors.tokenExpire))
        return res.status(401).send('Token has already expired');

    next(error);
}