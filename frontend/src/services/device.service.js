import http from "../http-common";
import authHeader from  "./auth-header";

class DeviceService {
    async getAll() {
        return http.get("/devices");
    }

    async get(id) {
        return http.get(`/devices/${id}`);
    }

    async create(data) {
        return http.post("/devices", {
            name: data.name,
            project_id: data.project.id,
            description: data.description,
        }, { headers: authHeader() });
    }

    async update(id, data) {
        return http.put(`/devices/${id}`, data, { headers: authHeader() });
    }

    async delete(id) {
        return http.delete(`/devices/${id}`, { headers: authHeader() });
    }

    async generateToken(device) {
        return http.post("/devices/token", device, { headers: authHeader() });
    }
}

export default new DeviceService();