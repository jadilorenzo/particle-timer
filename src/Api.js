import 'whatwg-fetch';

const DEVICE_ID = '<DEVICE_ID_HERE>';
const URL = `https://api.particle.io/v1/devices/${DEVICE_ID}/setCountdown`;
const ACCESS_TOKEN = '<ACCESS_TOKEN_HERE>';

export default class Api {
  send(command) {
    return fetch(`${URL}?access_token=${ACCESS_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        arg: command
      })
    });
  }
}
