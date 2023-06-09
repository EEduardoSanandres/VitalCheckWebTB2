import api from '../../core/services/api';

export class MedicineTypesApiService {
    async getAll() {
        return api.get('/medicinetypes');
    }

    async create(data) {
        return api.post('/medicinetypes', data);
    }

    async update(id, data) {
        return api.put(`/medicinetypes/${id}`, data);
    }

    async delete(id) {
        return api.delete(`/medicinetypes/${id}`);
    }
}