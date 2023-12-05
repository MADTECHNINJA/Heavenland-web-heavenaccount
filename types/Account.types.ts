import { z } from 'zod';

export const AccountSchema = z.object({
    createdAt: z.number(),
    id: z.string(),
    isReadyForGameLogin: z.boolean(),
    nickname: z.string().nullable(),
    username: z.string().nullable(),
    mainParagonAddress: z.string().nullable(),
    wallet: z.string(),
    referralCode: z.string(),
    referrerId: z.string().nullable(),
});

export type Account = z.infer<typeof AccountSchema>;

export type UpdateAccountRequestParams = {
    username?: string;
    nickname?: string;
    mainParagonAddress?: string;
    password?: string;
};

export type SetPasswordAccountRequestParams = Required<Pick<UpdateAccountRequestParams, 'password'>>;
export type UpdateDataAccountRequestParams = Pick<
    UpdateAccountRequestParams,
    'username' | 'nickname' | 'mainParagonAddress'
>;
export type CreateGameAccountRequestParams = Required<
    Pick<UpdateAccountRequestParams, 'username' | 'nickname' | 'password' | 'mainParagonAddress'>
>;
