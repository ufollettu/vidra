import "normalize.css";
import "./styles/style.scss";
import { promisesWay } from "./promises";
import { asyncAwaitWay } from "./async-await";

// questa cosa la posso fare perchè uso webpack, altrimenti i dati di mock avrei dovuto convertirli in js o usare altri modi per recuperarli
import mockData from "../MOCK_DATA.json";
const ipAddresses = mockData.map(mock => mock.ip_address);

const endpoint = "http://ip-api.com/batch";
const options =  {
  headers: { "Content-Type": "application/x-www-form-urlencoded" }
}
// l'endpoint risponde con richieste di massimo 100 elementi, devo creare dei chunk per passare la query in batch
const chunk = 100;

for (let i = 0, j = ipAddresses.length; i < j; i += chunk) {
  let temparray = ipAddresses.slice(i, i + chunk);
  const element = document.getElementById("results-fetch");
  // cambia i metodi per vedere i risultati
  switch (AA) {
    case false:
      promisesWay(endpoint, temparray, options, element);
      break;
    case true:
      asyncAwaitWay(endpoint, temparray, options, element);
      break;
  }
}
