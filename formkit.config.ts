// formkit.config.ts
import { DefaultConfigOptions } from '@formkit/vue';

const greaterThan = ({ value }: any, min = 0) => {
    return Number(value) > Number(min);
};

const containsUppercase = ({ value }: any) => {
    return value !== value.toLowerCase();
};

const containsNumber = ({ value }: any) => {
    return /\d/.test(value);
};

const config: DefaultConfigOptions = {
    rules: {
        greaterThan,
        containsUppercase,
        containsNumber,
    },
};

export default config;
