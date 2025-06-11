//authcheck middleware it is a ts file so add types too

import { Request, Response, NextFunction } from 'express';
import {verify, JwtPayload} from 'jsonwebtoken';
import config from '../config';


export default function authCheck(req: Request, res: Response, next: NextFunction) {
    // your auth check logic
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
    }else{
        // Verify token
        try {
            const decoded = verify(token, config.JWT_SECRET!) as JwtPayload;
            req.headers.username = decoded.username;
        } catch (error) {
            res.status(401).json({ message: 'Invalid token' });
        }
    }
    
    next();
}
