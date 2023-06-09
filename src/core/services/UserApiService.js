import api from '../../core/services/api';

export class UserApiService {
    async getAll() {
        return api.get('/user');
    }

    async getById(id) {
        return api.get(`/user/${id}`);
    }

    async create(data) {
        return api.post('/user', data);
    }

    async update(id, data) {
        return api.put(`/user/${id}`, data);
    }

    async delete(id) {
        return api.delete(`/user/${id}`);
    }
}
