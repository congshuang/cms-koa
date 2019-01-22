import axios from "../common/axios";

export function login(url, data = {}, config = {
  "headers": {
    'Content-Type': 'application/x-www-form-urlencoded', //设置跨域头部
  }
}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data, config)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err.response);
      })
  })
}

