//authcheck middleware it is a ts file so add types too

import { Request, Response, NextFunction } from 'express';

export default function authCheck(req: Request, res: Response, next: NextFunction) {
    // your auth check logic
    next();
}