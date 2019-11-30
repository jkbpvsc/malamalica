import { Request } from 'express';

export interface GIDUser {
    gid_name: string;
    gid_uuid: string;
}

export interface JWTUser {
    user: GIDUser;
}

export interface RequestWithUserObject extends Request{
    user: JWTUser;
}