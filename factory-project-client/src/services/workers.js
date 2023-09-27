import api from "./api";
import ApiService from "./api"
import { JobTitle } from "../enums/JobTitle";
import { getItem, setItem } from "../services/localStorageService";

const baseUrl = "https://localhost:7103/api/Worker";

export const addWorker = (worker) => {
    const transformedObject = {};

    for (const key in worker) {
        if (Object.hasOwnProperty.call(worker, key)) {
            transformedObject[key] = worker[key].value;
        }
    }
    transformedObject.job = JobTitle[transformedObject.job]
    console.log(transformedObject)

    ApiService.post(baseUrl, transformedObject, () => { })

}

export const getAllWorkers = async () => {
    return await ApiService.get(baseUrl, () => { })
}

export const handCheck = async () => {
    const token = getItem("token");
    if (!token) {
        ApiService.get(`${baseUrl}/handCheck`, () => { }).then(res => {
            setItem("token", res.value);
        })
    }
}