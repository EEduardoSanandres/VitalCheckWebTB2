import api from '../../core/services/api';

export class UserTypeApiService {
    async getAll() {
        return api.get('/usertype');
    }

    async create(data) {
        return api.post('/usertype', data);
    }

    async update(id, data) {
        return api.put(`/usertype/${id}`, data);
    }

    async delete(id) {
        return api.delete(`/usertype/${id}`);
    }
}