import api from '../../core/services/api';

export class InventoryApiService {
    async getAll() {
        return api.get('/inventory');
    }

    async getByUserId(userId) {
        return api.get(`/inventory/user/${userId}`);
    }

    async getByMedicineId(medicineId) {
        return api.get(`/inventory/medicine/${medicineId}`);
    }

    async create(data) {
        return api.post('/inventory', data);
    }

    async update(id, data) {
        return api.put(`/inventory/${id}`, data);
    }

    async delete(id) {
        return api.delete(`/sales/${id}`);
    }
}