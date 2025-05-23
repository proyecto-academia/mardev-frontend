import apiClient from '../../services/apiClient';
class MediaRepository {
    constructor() {
        this.prefix = import.meta.env.VITE_PROD_MEDIA_PREFIX || import.meta.env.VITE_DEV_MEDIA_PREFIX || '';
    }

    async getUrlSingleObject(object, id, media){
        const path = `${this.prefix}/${object}/${id}/${media}`;

        try {
            const response = await apiClient.get(path);
            return response.data.data;
        } catch (error) {
            if (error.response?.status === 404) {
                return { url: null };
            }else{
                console.log(error)
                console.error(`[GET ${path} ERROR]: ${error.response?.data?.message || error.message}`);
                throw error;
            }
            
        }
    }

    async getUrlMultipleObjects(path, ids){
        try {
            if(!Array.isArray(ids) || ids.length === 0) {
                throw new Error('IDs must be a non-empty array');
            }
            const response = await apiClient.get(`${this.prefix}/${path}/multiple`, { params: { ids } });
            return response.data.data;
        } catch (error) {
            console.error(`[GET ${path} ERROR]: ${error.response?.data?.message || error.message}`);
            throw error;
        }
    }



}

export default new MediaRepository();