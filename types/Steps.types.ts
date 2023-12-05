import { Ref } from 'vue';

export type StepsParam = {
    id: number;
    title: string;
    component: any;
};

export class Steps {
    data: Array<StepsParam & { active: Ref<boolean> }>;

    constructor(steps: Array<StepsParam>) {
        if (!steps.length) {
            throw new Error('invalid: steps are empty');
        }

        this.data = steps.map((s) => {
            return {
                id: s.id,
                title: s.title,
                component: s.component,
                active: ref(false),
            };
        });

        this.data[0].active.value = true;
    }

    get currentStep() {
        return this.data.find((s) => s.active.value)?.component;
    }

    select(title: string) {
        this.data.forEach((s) => (s.active.value = false));

        const currentStep = this.data.findIndex((s) => s.title === title);

        this.data[currentStep].active.value = true;
    }

    previousStep() {
        const currentStep = this.data.findIndex((s) => s.active.value);

        this.data[currentStep].active.value = false;

        if (currentStep > 0) {
            this.data[currentStep - 1].active.value = true;
        }
    }

    nextStep() {
        const currentStep = this.data.findIndex((s) => s.active.value);

        this.data[currentStep].active.value = false;

        if (currentStep < this.data.length - 1) {
            this.data[currentStep + 1].active.value = true;
        }
    }
}
