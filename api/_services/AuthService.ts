import axios from 'axios';

import { logger } from '@/plugins/logger.client';

import { Path, SubPath } from '@/api/resources';
import { AccessToken, AccessTokenSchema } from '~/types/AccessToken.types';

class AuthService {
    async checkToken(): Promise<AccessToken> {
        await logger.info('[API]', 'AuthService', 'accessToken');

        const data = (
            await axios.post(`idm/${Path.AUTH}/${SubPath.AUTH.ACCESS_TOKEN}`, undefined, {
                withCredentials: true,
            })
        ).data;

        return AccessTokenSchema.parse(data?.accessToken);
    }

    async logout(): Promise<void> {
        await logger.info('[API]', 'AuthService', 'logout');

        return await axios.delete(`idm/${Path.AUTH}/${SubPath.AUTH.LOGIN}`, {
            withCredentials: true,
        });
    }
}

export default new AuthService();
