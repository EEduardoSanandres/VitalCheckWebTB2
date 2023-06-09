import api from '../../core/services/api';

export class MedicinesApiService {
    async getAll() {
        return api.get('/medicines');
    }

    async getByMedicinetypeIdId(medicinetypeId) {
        return api.get(`/medicines/medicinetype/${medicinetypeId}`);
    }

    async create(data) {
        return api.post('/medicines', data);
    }

    async update(id, data) {
        return api.put(`/medicines/${id}`, data);
    }

    async delete(id) {
        return api.delete(`/medicines/${id}`);
    }
}