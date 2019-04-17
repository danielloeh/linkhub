// How to use:
// postData('http://example.com/answer', {answer: 42})
//   .then(data => console.log(data)) // JSON from `response.json()` call
//   .catch(error => console.error(error))

export function postData (url, headers, data) {

  const request = {
    body: data,
    headers,
    method: "POST",
    mode: "cors",
  };

  return fetch(url, request);
}