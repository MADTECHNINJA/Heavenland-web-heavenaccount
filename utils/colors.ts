export const getTierAccentBg = (tier?: number) => {
    switch (tier) {
        case 0:
            return 'from-[#b3e109] to-[#658005]';

        case 1:
            return 'from-[#f123f0] to-[#801380]';

        case 2:
            return 'from-[#67cab1] to-[#418070]';

        default:
            return 'from-[#1b5857]';
    }
};
