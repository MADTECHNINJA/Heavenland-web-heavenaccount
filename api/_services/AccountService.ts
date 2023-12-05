import axios from 'axios';

import { logger } from '@/plugins/logger.client';

import { Path } from '@/api/resources';
import { Account, UpdateAccountRequestParams, AccountSchema } from '~/types/Account.types';

class AccountService {
    async getAccount(accountId: string): Promise<Account> {
        await logger.info('[API]', 'AccountService', 'getAccount', accountId);

        const data = (await axios.get(`idm/${Path.ACCOUNTS}/${accountId}`)).data;

        AccountSchema.parse(data);

        return data;
    }

    async updateAccount(accountId: string, params: UpdateAccountRequestParams): Promise<Account> {
        await logger.info('[API]', 'AccountService', 'updateAccount', params);

        const res = await axios.patch(`idm/${Path.ACCOUNTS}/${accountId}`, params);

        return res.data;
    }

    async exists(id: string, param: string) {
        try {
            await axios.head(`idm/${Path.ACCOUNTS}/${param}:${id}`);
            return true;
        } catch (e) {
            return e;
        }
    }
}

export default new AccountService();
