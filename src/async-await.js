import axios from "axios";
import { appendList, errorHandler } from "./tools";

export async function asyncAwaitWay(endpoint, body, options, element) {
  try {
    const response = await axios.post(endpoint, body, options);
    appendList(response.data, element);
  } catch (error) {
    errorHandler(error, element)
  }
}
