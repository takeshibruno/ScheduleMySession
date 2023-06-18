import { url_back } from "./back";

const fetchData = () => {
  return fetch(url_back + '/comunicados', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .catch(error => {
      console.error(error);
    });
};

export default fetchData();
