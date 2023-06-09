import api from '../../core/services/api';

export class ClientsApiService {
    async getAll() {
        return api.get('/clients');
    }

    async create(data) {
        return api.post('/clients', data);
    }

    async update(id, data) {
        return api.put(`/clients/${id}`, data);
    }

    async delete(id) {
        return api.delete(`/clients/${id}`);
    }
}