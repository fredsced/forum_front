export default function toFetch(options) {
  let headers = new Headers();
  headers.append("Content-Type", "application/json");

  const { url, method, callBack, callBackOnError, body } = options;

  fetch(url, { method, headers, body })
    .then((response) => response.json())
    .then((data) => {
      callBack(data);
    })
    .catch(() => {
      callBackOnError();
    });
}
