const fetchData = (data) => {
    return fetch(`http://localhost:3001/api/v1/customers/${data}`)
    .then(response => response.json())
}
export default fetchData;