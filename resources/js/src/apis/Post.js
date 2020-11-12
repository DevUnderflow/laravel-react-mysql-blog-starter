import axios from 'axios';

const Post = {
    list: (page = 1) => {
        return axios.get("/posts?page=" + page);
    },
    add: payload => {
        let data = Post.toFormData(payload);

        return axios.post("/posts", data, {
            headers: {
                Authorization:
                    "Bearer " + localStorage.getItem("user.api_token"),
                "Content-Type": "multipart/form-data"
            }
        });
    },
    get_post_by_callback: (id, successCb, failCb) => {
        return axios.get("/posts/" + id).then(response => {
            successCb(response);
        }).catch(err => {
            failCb(err);
        });
    },
    add_likes: (id,successCb, failCb) => {
        return axios
            .post(
                "/posts/likes",
                { id: id },
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("user.api_token")
                    }
                }
            )
            .then(response => {
                successCb(response);
            })
            .catch(err => {
                failCb(err);
            });
    },
    showOne: id => {
        return axios.get("/posts/" + id);
    },
    edit: (payload, id) => {
        let data = Post.toFormData(payload);
        console.log(data);
        data.append("_method", "PUT");

        return axios.post("/posts/" + id, data, {
            headers: {
                Authorization:
                    "Bearer " + localStorage.getItem("user.api_token"),
                "Content-Type": "multipart/form-data"
            }
        });
    },
    remove: id => {
        return axios.delete("/posts/" + id, {
            headers: {
                Authorization:
                    "Bearer " + localStorage.getItem("user.api_token")
            }
        });
    },
    toFormData: payload => {
        const formData = new FormData();

        for (let key in payload) {
            if (key != "tags") {
                formData.append(key, payload[key]);
            } else {
                for (let i = 0; i < payload[key].length; i++) {
                    formData.append("tags[]", payload[key][i]);
                }
            }
        }
        return formData;
    }
};

export default Post;
