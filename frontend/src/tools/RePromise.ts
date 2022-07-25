export type RePromise<T> = Promise<T> & {
    resolve: (value: T) => void,
    reject: (reason?: any) => void;
    state: 'pending' | 'resolved' | 'rejected';
}

export function RePromise<T>(): RePromise<T>;
export function RePromise<T>(promise: Promise<T>): RePromise<T>;
export function RePromise<T>(promise?: Promise<T>): RePromise<T> {
    let aResolve: any;
    let aReject: any;
    
    const newPromise: any = new Promise((resolve, reject) => {
        aResolve = resolve;
        aReject = reject;
    });
    
    if (promise) {
        promise.then(x => aResolve(x)).catch(x => aReject(x));
    }

    newPromise.state = 'pending';
    newPromise.resolve = (value: T) => {
        if (newPromise.state === 'pending') {
            aResolve(value);
            newPromise.state = 'resolved';
        }
    };
    newPromise.reject = (reason?: any) => {
        if (newPromise.state === 'pending') {
            aReject(reason);
            newPromise.state = 'rejected';
        }
    };
    return newPromise;
}