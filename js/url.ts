import useQueryRoute from '~/composables/useQueryRoute';

export const getTxSolscanUrl = (txSig: string) => {
    const isDevnet = import.meta.env.VITE_HL_MODE === 'development';

    return `https://solscan.io/tx/${txSig}?${isDevnet ? 'cluster=devnet' : ''}`;
};

export const redirectToAuth = () => {
    const { refCode } = useQueryRoute();

    const refCodeSuffix = refCode.value ? `&refCode=${refCode.value}` : '';

    window.location.href = `${import.meta.env.VITE_HL_AUTH_URL}?client=webapp&redirectTo=${
        import.meta.env.VITE_HL_ACCOUNT_URL
    }${refCodeSuffix}`;
};
