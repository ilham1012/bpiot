require "auth/auth_commons"

URL = "http://backend:5000/api/v1/auth/mqtt"

function auth_on_register(reg)
    if reg.username ~= nil and reg.password ~= nil then
        print("Hello World: REGISTER")

        key = json.encode({
            mountpoint = reg.mountpoint,
            client_id = reg.client_id, 
            -- username = reg.username,
            -- password = reg.password
        })
        headers = {}
        headers["x_post_header"] = "X-POST-HEADER"
        headers['Accept'] = "application/json"
        headers["Content-Type"] = "application/json"
        headers["Authorization"] = "Bearer " .. reg.password

        ret = http.post(pool, URL, key, headers)
        -- for key,value in pairs(o) do
        --     print("found member " .. key);
        -- end
        print(ret.status)
        if ret.status == 200 and ret.ref then
            body = http.body(ret.ref)
            json = json.decode(body)
            cache_insert(
                reg.mountpoint, 
                reg.client_id, 
                reg.username,
                json.publish_acl,
                json.subscribe_acl
                )
            return true
        else
            return false
        end
    end
    return false
end

-- function auth_on_publish(reg)
--     print("Hello World: PUBLISH")
--     print(reg)
--     return true
-- end

pool = "auth_http"
config = {
    pool_id = pool
}

http.ensure_pool(config)

hooks = {
    auth_on_register = auth_on_register,
    auth_on_publish = auth_on_publish,
    auth_on_subscribe = auth_on_subscribe,
    on_unsubscribe = on_unsubscribe,
    on_client_gone = on_client_gone,
    on_client_offline = on_client_offline,

    auth_on_register_m5 = auth_on_register_m5,
    auth_on_publish_m5 = auth_on_publish_m5,
    auth_on_subscribe_m5 = auth_on_subscribe_m5,
}