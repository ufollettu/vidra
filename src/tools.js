

export function appendList(data, element) {
  data.forEach(item => {
    if (item.countryCode === "IT") {
      const li = document.createElement("li");
      const code = document.createElement("code");
      const node = document.createTextNode(`IP: ${item.query}, Region: ${item.regionName}`);

      code.appendChild(node);
      li.appendChild(code);
      element.appendChild(li);
    }
  });
}

export function errorHandler(err, element) {
  const li = document.createElement("li");
  const code = document.createElement("code");
  const node = document.createTextNode(`${err}`);

  code.appendChild(node);
  li.appendChild(code);
  element.appendChild(li);
}