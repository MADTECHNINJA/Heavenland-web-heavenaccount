import { API } from '~/api';
import { Avatar, Building } from '~/types/Inventory.types';
import { DataWrapper } from '~/types/DataWrapper.types';
import { defineStore } from 'pinia';

export const useInventoryStore = defineStore({
    id: 'inventory',

    state: () => ({
        userAvatars: new DataWrapper<Avatar[]>(),
        userBuildings: new DataWrapper<Building[]>(),
    }),
    actions: {
        async fetchAvatars() {
            try {
                const resp = await API.InventoryService.getUserAvatars();
                this.userAvatars.setData(resp);
            } catch (e: any) {
                this.userAvatars.setError(e);
                throw e;
            }
        },
        async fetchBuildings() {
            try {
                const resp = await API.InventoryService.getUserBuildings();
                this.userBuildings.setData(resp);
            } catch (e: any) {
                this.userBuildings.setError(e);
                throw e;
            }
        },
    },
});
