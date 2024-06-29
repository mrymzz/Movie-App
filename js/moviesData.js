//
/* let apiKey = "eba8b9a7199efdcb0ca1f96879b83c44"
async function sayhi(){
    var response =await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&language=en-US&include_adult=false`);
    var res = await response.json(response);
    console.log(res);
}
sayhi() */
//

function Hover()
    {
      $(this).find($('.overlay')).css({"opacity":"1","visibility":"visible"});
      $(this).find($('.cardImage img')).addClass("animate");
  }
 function HoverNo()
    {
      $(this).find($('.overlay')).css({"opacity":"0","visibility":"hidden"});
      $('.cardImage img').removeClass("animate");
}  

let results,
movies,
movieImage,
movieTitle,
movieOverView,
movieRelease,
stars;

let apiKey = "eba8b9a7199efdcb0ca1f96879b83c44"
let y = `language=en-US&include_adult=false`

// start search
export async function searchMovie(x) {
    let movie = `https://api.themoviedb.org/3/search/movie?query=${x}&api_key=${apiKey}&${y}`;
    let response = await fetch(`${movie}`);
    if (response.ok && 400 != response.status) {
        let res = await response.json();
        results = res.results;
        movies = new Map(Object.entries(results));
        displayData();
    }
}
// end search
// start get data
export async function getData(x) {
    let response = await fetch(`https://api.themoviedb.org/3/${x}?api_key=${apiKey}&${y}`);
    if (response.ok && 400 != response.status) {
         let res = await response.json();
         results = res.results;
         movies = new Map(Object.entries(results));
         displayData();
    }
}
// end get data

export function displayData()
{
 let imgPath = 'https://image.tmdb.org/t/p/w500';
 let containerData = '';
    for(let [key,value] of movies)
    {
         conditions(value,imgPath);
         containerData += `
         <div class="col-lg-4 col-md-6">
         <div class="item overflow-hidden position-relative">
             <div class="cardImage">
                 <img class="img-fluid" src="${movieImage}" >
             </div>
             <div class="overlay overflow-hidden">
                 <h1 class="title">${value[movieTitle]}</h1>    
                 <p class="desc">${movieOverView}</p>
                 <p class="date"><span class="fst-normal">Release Date<span> : ${movieRelease}</p>
                 <h3 class="rate ">${stars}</h3>
                 <h3 class="rate  vote">${value.vote_average.toFixed(1)}</h3>
             </div>
         </div>
     </div>
    `
         $('#hero .row').html(containerData);
         $('#hero .item ').mouseenter(Hover);
        $('#hero .item').mouseleave(HoverNo);
    }
}

function conditions(value,imgPath)
{
    checkMovieImage(value,imgPath);
    checkMovieTItle(value);
    checkMovieDesc(value);
    checkMovieDate(value);
    checkMovieVote(value);
}
function checkMovieImage(value,imgPath)
{
    if(value.poster_path == null && value.backdrop_path == null)
    {
        movieImage = `./../images/3bhkrj58Vtu7enYsRolD1fZdja1.jpg`;
    }
    else if(value.poster_path == null)
    {
        movieImage = `${imgPath+value.backdrop_path}`;
    }
    else if(value.hasOwnProperty('poster_path'))
    {
        movieImage = `${imgPath+value.poster_path}`;
    }
}
function checkMovieTItle(value)
{
    if(value.hasOwnProperty('title'))
    {
        movieTitle = `title`;
    }
    else if(value.hasOwnProperty('name'))
    {
            movieTitle = `name`;
    }
}
function checkMovieDesc(value)
{
    if(value.overview.length > 300)
    {
        movieOverView = `${value.overview.slice(0,300)}...`;
    }
    else
    {
        movieOverView = `${value.overview}`;
    }
}
function checkMovieDate(value)
{
    if(value.hasOwnProperty('release_date'))
    {
        movieRelease = `${value.release_date}`;
    }
    else if(value.hasOwnProperty('first_air_date'))
    {
        movieRelease = `${value.first_air_date}`;
    }
    else
    {
        movieRelease = "Release Date UnKnown";
    }
}
function checkMovieVote(value)
{
    if(value.vote_average < 1)
    {
        stars = `<i class="fa-solid fa-star text-muted fs-6"></i>`;
    }
    else if(value.vote_average < 2)
    {
        let x = '';
        stars = x + `<i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>`;
    }
    else if(value.vote_average < 3)
    {
        stars =  `<i class="fa-solid fa-star text-warning fs-6"></i>`;
    }
    else if(value.vote_average <4)
    {
        let x = '';
        for (let i = 0; i < 1; i++) {
        x += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        stars = x + `<i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>`;
    }
    else if(value.vote_average <5)
    {
        let x = '';
        for (let i = 0; i < 2; i++) {
        x += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        stars = x;
    }
    else if(value.vote_average <6)
    {
        let x = '';
        for (let i = 0; i < 2; i++) {
        x += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        stars = x + `<i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>`;
    }
    else if(value.vote_average < 7)
    {
        let x = '';
        for (let i = 0; i < 3; i++) {
        x += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        stars = x;
    }
    else if(value.vote_average < 8)
    {
        let x = '';
        for (let i = 0; i < 3; i++) {
        x += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        stars = x + `<i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>`;
    }
    else if(value.vote_average < 9)
    {
        let x = '';
        for (let i = 0; i < 4; i++) {
        x += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        stars = x;
    }
    else if(value.vote_average < 10)
    {
        let x = '';
        for (let i = 0; i < 4; i++) {
        x += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        stars = x + `<i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>`;
    }
    else
    {
        let x = '';
        for (let i = 0; i < 5; i++) {
            x += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        stars = x;
    }
}