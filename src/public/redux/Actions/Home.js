import Axios from "axios";

export const getHome = options => {
    return {
        type: "GET_HOME",
        payload: new Promise((resolve, reject) => {
            const { search = "", sort = "", page = "1", order = "" } = options;

            Axios.get(
                `http://localhost:4000/api/v1/products?byProduct=${order}&sort=${sort}&searchByName=${search}&pages=${page}`
            )
                .then(result => resolve(result))
                .catch(error => reject(error));
        })
    };
};