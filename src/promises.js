import axios from "axios";
import { appendList, errorHandler } from "./tools";

export function promisesWay(endpoint, body, options, element) {
  axios
    .post(endpoint, body, options)
    .then(response => appendList(response.data, element))
    .catch(error => errorHandler(error, element));
}
