import database from '../database';
import auth from '../auth';
import { errors } from 'shared';

//===| models |===//

type DataType = 'shows' | 'showtimes' | 'tickets';

//===| routes |===//

export function getall(target: DataType, admin: boolean) {
    return async (req: any, res: any) => {
        if (admin)
            checkAdmin(req);
        const result = await database[target].getall();
        res.json(result);
    };
}

export function getone(target: DataType, admin: boolean) {
    return async (req: any, res: any) => {
        if (admin)
            checkAdmin(req);
        const id = req.params.id;
        const data = await database[target].get(id);
        res.json(data);
    };
}

export function add(target: DataType, admin: boolean) {
    return async (req: any, res: any) => {
        if (admin)
            checkAdmin(req);
        const result = await database[target].add(req.body);
        res.json(result);
    };
}

export function replace(target: DataType, admin: boolean) {
    return async (req: any, res: any) => {
        if (admin)
            checkAdmin(req);
        const id = req.params.id;
        const result = await database[target].replace(id, req.body);
        res.json(result);
    };
}

export function del(target: DataType, admin: boolean) {
    return async (req: any, res: any) => {
        if (admin)
            checkAdmin(req);
        const id = req.params.id;
        await database[target].delete(id);
        res.status(204).end();
    };
}

export function checkAdmin(request: any): void {
    const ip = getIP(request);
    const header: string = request.get('authorization');
    if (!header)
        throw errors.noAdmin;
    const split = header.split(' ');
    if (split[0].toLowerCase() === 'bearer') {
        const data: any = auth.checkToken(split[1]);
        if (ip === data.ip)
            return;
        throw errors.invalidIP;
    }

    throw errors.noAdmin;
}

export function isAdmin(request: any): boolean {
    try {
        checkAdmin(request);
        return true;
    } catch (error) {
        if (error === errors.noAdmin)
            return false;
        else
            throw error;
    }
}

export function getIP(request: any): string {
    return request.headers['x-forwarded-for'] || request.connection.remoteAddress;
}