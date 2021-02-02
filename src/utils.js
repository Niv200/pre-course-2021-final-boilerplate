const API_KEY = "$2b$10$XuL2sxBRse0ztW5NvhIj.eDrdm6USeYEycWAdhf98yrAJ3cdGNUla";
const URL = "https://api.jsonbin.io/v3/b/6015ef27abdf9c5567952161";

// Gets data from persistent storage by the given key and returns it
async function getPersistent(key) {
  const init = {
    method: "GET",
    headers: {
      "X-Master-Key": API_KEY,
    },
  };
  const request = new Request(URL, init);
  let data = await fetch(request);
  data = await data.json();
  return data.record[key];
}

// Saves the given data into persistent storage by the given key.
// Returns 'true' on success.
async function setPersistent(key, data) {
  const dataObj = {};
  dataObj[key] = data;
  const init = {
    method: "PUT",
    headers: {
      "X-Master-Key": API_KEY,
      "Content-Type": "application/json",
      "X-Bin-Versioning": false,
    },
    body: JSON.stringify(dataObj),
  };
  const request = new Request(URL, init);
  let response = await fetch(request);
  return response.ok;
}
