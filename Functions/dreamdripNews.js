async function fetchingNews() {
  // const eventnumber = "9aa268453f6840ba49a75adbb6a4e3b6";
  // category = "general";
  url =
    `https://newsapi.org/v2/everything?q=bitcoin&apiKey=ae1061d8e1f54b529617ea64550460da`
  const showNews = document.querySelector(".displaynews");
  try {
    const request = await fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const articles = data.articles;
        console.log('articles' , articles);
        for (let index = 0; index < articles.length; index++) {
          const timeRecieved = articles[index].publishedAt;
          const timeConvert = new Date(timeRecieved);
          const timeReset = timeConvert.toLocaleTimeString();
          // const element = array[index];
          showNews.innerHTML += `<div class="card mb-3 d-flex" newsbody>
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${
              articles[index]["urlToImage"]
            }" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <a href='${articles[index]["url"]}'>
              <h5 class="card-title">${articles[index]["title"]}</h5>
              </a>
              <p class="card-text">${articles[index]["description"]}</p>
              <p class="card-text"><small class="text-body-secondary">${timeReset}</small></p>
            </div>
          </div>
        </div>
      </div>
        `;
        }
      });
  } catch (error) {
    console.log(error);
  }
}
fetchingNews();
//

const homeBtn = document.querySelector(".homeBtn");
homeBtn.onclick = () => {
  window.location.href = "./dreamdripHome.html";
};
const trendingBtn = document.querySelector(".trendBtn");

trendingBtn.onclick = () => {
  window.location.href = "./dreamDripTrend.html";
};

const newsBtn = document.querySelector(".newsBtn");
newsBtn.onclick = () => {
  window.location.href = "./dreamDripNews.html";
};

const settingsBtn = document.querySelector(".settingsBtn");

settingsBtn.onclick = () => {
  window.location.href = "./dreamDripSettings.html";
};
