import { defineStore } from 'pinia';
import { DataWrapper } from '~/types/DataWrapper.types';
import { logger } from '~/plugins/logger.client';
import { API } from '~/api';
import { useAuthStore } from '~/store/auth';
import {
    Account,
    CreateGameAccountRequestParams,
    SetPasswordAccountRequestParams,
    UpdateDataAccountRequestParams,
} from '~/types/Account.types';
import { APIResponse } from '~/api/types';
import { Paragon } from '~/types/Paragon.types';

export const useAccountStore = defineStore({
    id: 'account',

    state: () => ({
        account: new DataWrapper<Account>(),
        gameProfileParagon: new DataWrapper<Paragon | null>(),
        paragons: new DataWrapper<APIResponse<Paragon[]>>(),
    }),

    getters: {
        isReadyForGameLogin: (state) => {
            return state.account.data?.isReadyForGameLogin;
        },

        accountWalletPublicKey: (state) => {
            return state.account.data?.wallet;
        },
    },

    actions: {
        async fetchAccount() {
            logger.info('[TOKEN] Fetching user account');

            const authStore = useAuthStore();

            const accountId = authStore.accountId;

            if (!accountId) {
                throw new Error('not defined: accountId');
            }

            try {
                const account = await API.AccountService.getAccount(accountId);

                logger.info('[TOKEN] Account fetched', account);

                this.account.setData(account);
            } catch (e: any) {
                logger.error('[TOKEN] Fetching failed with error', e);

                this.account.setError(e);

                throw e;
            }

            if (this.account.data?.mainParagonAddress) {
                try {
                    const gpp = await API.NftService.getNft(this.account.data.mainParagonAddress);

                    logger.info('[DATA] Game profile paragon fetched', gpp);

                    this.gameProfileParagon.setData(new Paragon(gpp.data));
                } catch (e: any) {
                    logger.error('[DATA] Fetching failed with error', e);

                    this.gameProfileParagon.setError(e);

                    throw e;
                }
            } else {
                this.gameProfileParagon.setData(null);
            }

            if (this.account.data?.id) {
                try {
                    const paragons = await API.InventoryService.getUserParagons(this.account.data.id);

                    logger.info('[DATA] Paragons fetched', paragons);

                    this.paragons.setData(paragons);
                } catch (e: any) {
                    logger.error('[DATA] Fetching failed with error', e);

                    this.paragons.setError(e);

                    throw e;
                }
            }
        },

        async updateAccount(
            params: CreateGameAccountRequestParams | SetPasswordAccountRequestParams | UpdateDataAccountRequestParams
        ) {
            const authStore = useAuthStore();

            const accountId = authStore.accountId;

            if (!accountId) {
                throw new Error('not defined: accountId');
            }

            try {
                const account = await API.AccountService.updateAccount(accountId, params);

                this.account.setData(account);

                logger.info('[TOKEN] Account created', account);
            } catch (e: any) {
                logger.error('[TOKEN] Update failed with error', e);

                throw e;
            }

            if (this.account.data?.mainParagonAddress) {
                try {
                    const gpp = await API.NftService.getNft(this.account.data.mainParagonAddress);

                    logger.info('[DATA] Game profile paragon fetched', gpp);

                    this.gameProfileParagon.setData(new Paragon(gpp.data));
                } catch (e: any) {
                    logger.error('[DATA] Fetching failed with error', e);

                    this.gameProfileParagon.setError(e);

                    throw e;
                }
            } else {
                this.gameProfileParagon.setData(null);
            }
        },
    },
});
