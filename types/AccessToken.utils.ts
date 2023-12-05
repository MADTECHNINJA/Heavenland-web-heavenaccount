import decode, { JwtPayload } from 'jwt-decode';

export const JWTDecode = function (token: string): JwtPayload {
    return decode(token);
};
