import { Request } from 'express';

export interface RequestWithUserObject extends Request{
    user: object;
}