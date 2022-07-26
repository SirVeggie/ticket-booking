import { errors } from 'shared';
import { ValidationError } from './tools/dataValidation';

export function unknownEndpoint(req: any, res: any) {
    res.status(404).send('unknown endpoint');
}

export function errorHandler(error: any, req: any, res: any, _next: any) {
    console.error(`Error: ${error.message ?? error}`);

    if (error instanceof ValidationError)
        return res.status(400).send({ error: error.message });

    if (error?.message.startsWith(errors.noData.message))
        return res.status(404).send({ error: 'unknown endpoint' });
    if (error?.message.startsWith(errors.invalidData.message))
        return res.status(400).send({ error: 'Data provided was invalid' });
    if (error?.message.startsWith(errors.illegalData.message))
        return res.status(400).send({ error: errors.illegalData });
    if (error?.message.startsWith(errors.noAdmin.message))
        return res.status(401).send({ error: 'Performed Admin action without proper admin token' });
    if (error?.message.startsWith(errors.invalidIP.message))
        return res.status(401).send({ error: 'Admin token was invalid' });
    if (error?.message.startsWith(errors.tokenExpire.message))
        return res.status(401).send({ error: 'Token has already expired' });
    if (error?.message ?? error === 'jwt expired')
        return res.status(401).send({ error: 'Token has already expired' });

    console.log('Error was unhandled');
    
    res.status(500).send({ error: 'Something went wrong' });
}