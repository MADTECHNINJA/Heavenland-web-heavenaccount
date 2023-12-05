import { defineNuxtPlugin } from '#app';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import specific icons */
import {
    faBars as fasBars,
    faChevronLeft,
    faChevronRight,
    faCircleCheck,
    faCircleX,
    faCopy,
    faSignOutAlt,
    faTimes,
    faTriangleExclamation,
    faTrash,
    faWallet,
    faPlus,
} from '@fortawesome/pro-solid-svg-icons';

import {
    faCheckCircle,
    faTimesCircle,
    faUserCircle,
    faKey,
    faGamepadModern,
    faUserAstronaut,
    faEmptySet,
    faHouseBuilding,
    faBackpack as fasBackpack,
    faLink,
    faCircleInfo,
    faWallet as farWallet,
} from '@fortawesome/pro-regular-svg-icons';

import {
    faGrid2,
    faUnlock,
    faBackpack,
    faUserCircle as fasUserCircle,
    faHourglassHalf,
} from '@fortawesome/pro-duotone-svg-icons';

export default defineNuxtPlugin((nuxtApp) => {
    library.add(
        faKey,
        farWallet,
        faUnlock,
        faEmptySet,
        faTriangleExclamation,
        faCheckCircle,
        faTimesCircle,
        faBackpack,
        fasBackpack,
        faTrash,
        faPlus,
        faUserAstronaut,
        faHouseBuilding,
        fasBars,
        faGrid2,
        faLink,
        fasUserCircle,
        faCircleX,
        faCircleCheck,
        faChevronRight,
        faChevronLeft,
        faTimes,
        faSignOutAlt,
        faWallet,
        faUserCircle,
        faCopy,
        faGamepadModern,
        faCircleInfo,
        faHourglassHalf
    );

    // @ts-ignore
    nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon);
});
