import axios from 'axios';
import qs from 'querystring';
import { GIDUser } from "../interfaces";

export async function getAccessToken(
    code: string,
    client_id: string,
    client_secret: string,
    redirect_uri: string,
): Promise<string> {
    const response = await axios.post(
        'https://api.global.id/v1/auth/token',
        qs.encode({ client_id, code, client_secret, redirect_uri, grant_type: 'authorization_code' }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}
    );

    return response.data.access_token
}

export async function getGIDUser(
    accessToken: string
): Promise<GIDUser> {
    const response = await axios.get(
        'https://api.global.id/v1/identities/me',
        { headers: { 'Authorization': `Bearer ${accessToken}`}}
    );

    return response.data;
}