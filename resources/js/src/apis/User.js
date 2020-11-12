import axios from "axios";

const User = {
    showOne: id => {
        return axios.get("/users/" + id, {
            headers: {
                Authorization:
                    "Bearer " + localStorage.getItem("user.api_token")
            }
        });
    },
    profile: () => {
        return axios.get("/profile", {
            headers: {
                Authorization:
                    "Bearer " + localStorage.getItem("user.api_token")
            }
        });
    },
    updateProfile: payload => {
        console.log(payload)
        let data = User.toFormData(payload);
        data.append("_method", "POST");
        console.log('DATA: ',data);
        return axios.post("/profile/update", data, {
            headers: {
                Authorization:
                    "Bearer " + localStorage.getItem("user.api_token"),
                "Content-Type": "multipart/form-data"
            }
        });
    },
    toFormData: payload => {
        const formData = new FormData();

        for (let key in payload) {
                formData.append(key, payload[key]);
        }

        return formData;
    }
};

export default User;
