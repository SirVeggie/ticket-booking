import { v1 } from 'uuid';

export function uuid(): string {
    return v1();
}