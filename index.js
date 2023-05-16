const apiKey = "26636a39c7604d96be6003cdfaeaa2c2";
let mainBody = document.querySelector(".main");
let optionContainer = document.querySelector(".option-container");

const country = "in";   // in for india

const optionsUI = ["general","entertainment","health","science","sports","technology"];

//handle hamburger

let ham = document.querySelector(".fa-bars");
let sidebar =document.querySelector(".side-bar");
let closeIcon = document.querySelector(".fa-circle-xmark");
ham.addEventListener('click',()=>{
    sidebar.style.display = "block";
});

closeIcon.addEventListener('click',()=>{
    sidebar.style.display = "none";
});

setInterval(()=>{
    if (window.innerWidth > 499) {
        sidebar.style.display = "none";
    }
},500)

let dateElement = document.querySelector(".date");
let dateUpdate = new Date();
dateUpdate = dateUpdate.toString();
let arr = dateUpdate.split(" ");
let day = arr[0];
let month = arr[1];
let date = arr[2]+", "+arr[3];

dateElement.innerText = day +", "+month+" "+date;

//100 requests/day
let requestURL;


//create cards from data

const generateUI = (articles)=>{
    console.log("call laga generateUI ko")
    for(let item of articles){
        let card = document.createElement("div");
        card.classList.add("news-card");
        card.innerHTML = `
            <div class = "news-image-container">

                <img src=${item.urlToImage}>
            </div>
            <div class = "news-content">
                <div class = "news-title">
                    ${item.title}
                </div>
                <div class = "news-description">
                    ${item.description || item.content || ""}
                </div>
                <a href="${item.url} target="_blank" class="view-button">Read More</a>    
            </div>
        `;
        mainBody.appendChild(card);
    }
};

//news api call function

async function getNews(){
    mainBody.innerHTML = "";
    try {
        let response = await fetch(requestURL);
        let data = await response.json();
        console.log(data);
        generateUI(data.articles);         
    } catch (error) {
        console.log("problem in fetching data");
    }

}

//category selection

const selectCategory = (e,category)=>{
    let options = document.querySelectorAll(".option");

    options.forEach((element)=>{
        element.classList.remove("active");
    });
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
    e.target.classList.add("active");
    getNews();
};

//option buttons

const createOptions = () => {
    for (let i of optionsUI) {
      optionContainer.innerHTML += `<button class="option ${i == "general" ? "active" : ""}" onclick="selectCategory(event,'${i}')">${i.toUpperCase()}</button>`;
    }
  };

const init = ()=>{
    optionContainer.innerHTML = "";
    getNews();
    createOptions();
};

window.onload = ()=>{
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
    init();
};

