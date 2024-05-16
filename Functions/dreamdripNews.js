// alert('coming soon')

const apiKey = 'ae1061d8e1f54b529617ea64550460da'

const url =  'https://newsapi.org/v2/everything?q=apple&from=2024-05-15&to=2024-05-15&sortBy=popularity&apiKey=ae1061d8e1f54b529617ea64550460da'

let req = new Request(url)

fetch(req)
.then((response)=>{
    return response.json();
}).then((data)=>{
    console.log(data, 'data');
})
.catch((error)=>{
    console.log(error);
})