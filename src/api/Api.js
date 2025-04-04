const host = 'http://localhost:4000'

export default class Api {
  static get(endpoint) {
    return fetch(`${host}/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
  }
  static post(endpoint, body = {}) {
    return fetch(`${host}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(res => res.json())
  }
}