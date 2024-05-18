// alert('coming soon')

/*const eventnumber = 'ae1061d8e1f54b529617ea64550460da'

const url =  `https://newsapi.org/v2/everything?q=apple&from=2024-05-15&to=2024-05-15&sortBy=popularity&apiKey=${eventnumber}`


const showNews = document.querySelector('.displaynews')
async function fetchingNews(){
  let req = new Request(url)
  try {
    const newsRequest = await fetch(req)
  .then((response)=>{
    console.log(response);
    // console.log(newsRequest);
      return response.json();
  }).then((data)=>{
    console.log(data, 'dat');
      
      console.log(data.articles , 'data');
      data.articles.forEach((recieved, index)=>{
        console.log(`processing article ${index + 1}`);
        console.log(recieved);
           const timeRecieved = recieved.
           publishedAt
           const timeConvert = new Date(timeRecieved)
           const timeReset = timeConvert.toLocaleTimeString()
          showNews.innerHTML += `
          <div class="card mb-3 d-flex" newsbody>
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${
                  recieved.urlToImage}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <a href='${recieved.url}'>
                <h5 class="card-title">${recieved.title}</h5>
                </a>
                <p class="card-text">${recieved.description
                }</p>
                <p class="card-text"><small class="text-body-secondary">${timeReset}</small></p>
              </div>
            </div>
          </div>
        </div>
          `
      })
     
  })
  
  .catch((error)=>{
      console.log(error);
  })
  } catch (error) {
    console.log(error);
  }
  }
fetchingNews()**/

const eventnumber = 'aaa3033b79a4e91680bfc58a429f221e'
category = 'general';
url = 'https://gnews.io/api/v4/top-headlines?category=' + category + '&lang=en&country=us&max=10&apikey=' + eventnumber;
const showNews = document.querySelector('.displaynews')
fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    let articles = data.articles;

    console.log(articles);

    for (i = 0; i < articles.length; i++) {
      // articles[i].title
      console.log("Title: " + articles[i]['title']);
      // articles[i].description
      console.log("Description: " + articles[i]['description']);
      // You can replace {property} below with any of the article properties returned by the API.
      // articles[i].{property}
      // console.log(articles[i]['{property}']);

      // Delete this line to display all the articles returned by the request. Currently only the first article is displayed.
      // break;
      showNews.innerHTML += `<div class="card mb-3 d-flex" newsbody>
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${articles[i]['image']}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <a href='${articles[i]['url']}'>
            <h5 class="card-title">${articles[i]['title']}</h5>
            </a>
            <p class="card-text">${articles[i]['description']
            }</p>
            <p class="card-text"><small class="text-body-secondary">${''}</small></p>
          </div>
        </div>
      </div>
    </div>`
    }
  });




const homeBtn = document.querySelector('.homeBtn')
homeBtn.onclick=()=>{
    window.location.href = './dreamdripHome.html'
}
const trendingBtn = document.querySelector('.trendBtn')

trendingBtn.onclick=()=>{
    window.location.href = './dreamDripTrend.html'
}

const newsBtn = document.querySelector('.newsBtn')
newsBtn.onclick = ()=>{
    window.location.href = './dreamDripNews.html'
}

const settingsBtn = document.querySelector('.settingsBtn')

settingsBtn.onclick = ()=>{
    window.location.href = './dreamDripSettings.html'
}