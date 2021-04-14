import http from "../http-common";

class DeviceService {
    getAll() {
        return http.get("/devices");
    }

    get(id) {
        return http.get(`/devices/${id}`);
    }

    create(data) {
        return http.post("/devices", {
            name: data.name,
            project_id: data.project_id,
            description: data.description,
        });
    }

    update(id, data) {
        return http.put(`/devices/${id}`, data);
    }

    delete(id) {
        return http.delete(`/devices/${id}`);
    }
}

export default new DeviceService();