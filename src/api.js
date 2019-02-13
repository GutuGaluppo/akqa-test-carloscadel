import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:3000/',
})

const errHandler = err => {
  if (err.response && err.response.data) {
    console.error("API response", err.response.data)
    throw err.response.data.message
  }
  throw err
}
 
export default {
  service: service,
  buyNow(data) {
    console.log(data)
    return service
      // Carlos: The next line should actually be a POST request but there's no route created for it, so for this purpose I'm just using a GET request
      .get('/', data)
        .then(res => {
          console.log('Purchase data sent')
        })
        .catch(errHandler)
  },
}



