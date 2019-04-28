// How to use:
// postData('http://example.com/answer', {answer: 42})
//   .then(data => console.log(data)) // JSON from `response.json()` call
//   .catch(error => console.error(error))

export function postData ({url, authToken, idToken, data}) {

  const request = {
    body: `${data}`,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'IDToken': `${idToken}`,
      'Content-type': 'application/json',
    },
    method: 'POST',
    mode: 'cors',
  };

  return fetch(url, request);
}

export function getData ({url, authToken, idToken}) {

  const options = {
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'IDToken': `${idToken}`
    },
  };

  if (authToken) {
    return fetch(url, options);
  } else {
    return fetch(url);
  }
}