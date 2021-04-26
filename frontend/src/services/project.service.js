import http from "../http-common";

class ProjectService {
    async getAll() {
        return http.get("/projects");
    }

    async get(id) {
        return http.get(`/projects/${id}`);
    }

    async create(data) {
        return http.post("/projects", data);
    }

    async update(id, data) {
        return http.put(`/projects/${id}`, data);
    }

    async delete(id) {
        return http.delete(`/projects/${id}`);
    }
}

export default new ProjectService();