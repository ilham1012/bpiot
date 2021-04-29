import http from "../http-common";

class TelemetryService {
    async getAllLast(id) {
        let result = await http.get(`/telemetries/last/device/${id}`);
        let data = [];

        for(let i=0; i < result.data.length; i++){
            let val = null;
            let row = {};

            let tele = result.data[i];
            
            if (tele.long_val != null){
                val = tele.long_val;
            } else if (tele.double_val != null){
                val = tele.double_val;
            } else if (tele.string_val != null){
                val = tele.string_val;
            } else if (tele.json_val != null){
                val = tele.json_val;
            }

            row.id = tele.id;
            row.time = tele.time;
            row.key = tele.key.key;
            row.value = val;

            data.push(row);
        };

        return data
    }

    async getLast(id) {
        return http.get(`/telemetries/last/${id}`);
    }

    
}

export default new TelemetryService();