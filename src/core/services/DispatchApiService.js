import api from '../../core/services/api';

export class DispatchApiService {
    async getAll() {
        return api.get('/dispatch');
    }

    async getByUser1Id(user1Id) {
        return api.get(`/dispatch/user1/${user1Id}`);
    }

    async getByUser2Id(user2Id) {
        return api.get(`/dispatch/user2/${user2Id}`);
    }

    async getByMedicineId(medicineId) {
        return api.get(`/dispatch/medicine/${medicineId}`);
    }

    async create(data) {
        return api.post('/dispatch', data);
    }

    async update(id, data) {
        return api.put(`/dispatch/${id}`, data);
    }

    async delete(id) {
        return api.delete(`/dispatch/${id}`);
    }
}