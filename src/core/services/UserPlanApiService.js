import api from '../../core/services/api';

export class UserPlanApiService {
    async getAll() {
        return api.get('/userplan');
    }

    async create(data) {
        return api.post('/userplan', data);
    }

    async update(id, data) {
        return api.put(`/userplan/${id}`, data);
    }

    async delete(id) {
        return api.delete(`/userplan/${id}`);
    }
}