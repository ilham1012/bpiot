import http from "../http-common";
import authHeader from  "./auth-header";

class AclService {

    async get(id) {
        return http.get(`/acl/${id}`, { headers: authHeader() });
    }

    async create(data) {
        return http.post("/projects", data, { headers: authHeader() });
    }

    async update(id, data) {
        return http.put(`/projects/${id}`, data, { headers: authHeader() });
    }

    async delete(id) {
        return http.delete(`/projects/${id}`, { headers: authHeader() });
    }
}

export default new AclService();