import api from '../../core/services/api';

export class SalesApiService {
    async getAll() {
        return api.get('/sales');
    }

    async getByUserId(userId) {
        return api.get(`/sales/user/${userId}`);
    }

    async getByClientId(clientId) {
        return api.get(`/sales/client/${clientId}`);
    }

    async getByMedicineId(medicineId) {
        return api.get(`/sales/medicine/${medicineId}`);
    }

    async create(data) {
        return api.post('/sales', data);
    }

    async update(id, data) {
        return api.put(`/sales/${id}`, data);
    }

    async delete(id) {
        return api.delete(`/sales/${id}`);
    }
}