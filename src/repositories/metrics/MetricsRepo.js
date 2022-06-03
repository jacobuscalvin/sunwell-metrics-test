import { baseAxios } from "../index";

const defaultMetricPath = "cmb/metrics/";

export default { 

    getMetrics(_param){
        if (_param === undefined) {
            return baseAxios.get(defaultMetricPath + "?page=1&size=15");
        } else {
            return baseAxios.get(defaultMetricPath + `?page=${_param.page}&size=${_param.limit}`);
        }  
    },
    
    createMetric(_payload) {
        return baseAxios.post(defaultMetricPath, _payload);
    },

    getById(_selectedId) {
        return baseAxios.get(defaultMetricPath + _selectedId);
    },

    updateMetric(_selectedId, _payload) {
        return baseAxios.patch(defaultMetricPath + _selectedId, _payload);
    },

    deleteMetric(_selectedId) {
        return baseAxios.delete(defaultMetricPath + _selectedId);
    }
}