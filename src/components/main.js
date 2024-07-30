const API_KEY = 'api_key=1c5541e33ead1c3aece7319ee90caf7d';
const BASE_URL = 'https://api.themoviedb.org/3' ;
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'
+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY; 

const genres = [
  {
    "id": 28,
    "name": "Action"
  },
  {
    "id": 12,
    "name": "Adventure"
  },
  {
    "id": 16,
    "name": "Animation"
  },
  {
    "id": 35,
    "name": "Comedy"
  },
  {
    "id": 80,
    
    "name": "Crime"
  },
  {
    "id": 99,
    "name": "Documentary"
  },
  {
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 10751,
    "name": "Family"
  },
  {
    "id": 14,
    "name": "Fantasy"
  },
  {
    "id": 36,
    "name": "History"
  },
  {
    "id": 27,
    "name": "Horror"
  },
  {
    "id": 10402,
    "name": "Music"
  },
  {
    "id": 9648,
    "name": "Mystery"
  },
  {
    "id": 10749,
    "name": "Romance"
  },
  {
    "id": 878,
    "name": "Science Fiction"
  },
  {
    "id": 10770,
    "name": "TV Movie"
  },
  {
    "id": 53,
    "name": "Thriller"
  },
  {
    "id": 10752,
    "name": "War"
  },
  {
    "id": 37,
    "name": "Western"
  }
]
const main = document.getElementById('main');
const main_tab = document.getElementById('main_tab');
const form = document.getElementById('form');
const search = document.getElementById('search');
const tagsEl = document.getElementById('tags');
const overlayContent = document.getElementById('overlay-content');

var selectedGenre = [];
/*
setGenre():
This function sets up the genre tags for filtering movies. It creates a list of genres, attaches event listeners to each genre tag,
 and handles the selection of a genre to filter movies by it.

*/
function setGenre() {
    tagsEl.innerHTML = '';
    let tagCount = 0; // Initialize a counter for the tags

    genres.forEach(genre => {
        if (tagCount >= 11) return; // Stop creating more tags if limit is reached

        const li = document.createElement('li'); // Create 'li' elements
        li.classList.add('tag'); // Add class 'tag' to li
        li.id = genre.id; // Set id to genre id
        li.innerText = genre.name; // Set the text to genre name

        li.addEventListener('click', () => {
            // Clear all active classes
            document.querySelectorAll('.tag').forEach(tag => {
                tag.classList.remove('active');
            });

            // Clear the selectedGenre array
            selectedGenre = [];

            // Add the clicked genre to the selectedGenre array
            selectedGenre.push(genre.id);
            li.classList.add('active'); // Add active class to the clicked li

            console.log(selectedGenre);
            getMovies(API_URL + '&with_genres=' + encodeURI(selectedGenre.join(',')));
            highlightSelection();
        });

        tagsEl.appendChild(li); // Append li to tagsEl
        tagCount++; // Increment the counter
    });

    updateActiveGenres(); // Initial highlight based on selected genres
}
/*updateActiveGenres():
This function highlights the selected genre tags to provide visual feedback on which genres are currently active.
*/
function updateActiveGenres() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        if (selectedGenre.includes(parseInt(tag.id))) {
            tag.classList.add('active');
        } else {
            tag.classList.remove('active');
        }
    });
}

// Ensure the function runs after DOM is fully loaded
document.addEventListener('DOMContentLoaded', (event) => {
    setGenre();
});


/*
getMovies(url):
Fetches movies from the specified URL and processes the data to display it on the page.
*/

getMovies(API_URL);
function getMovies(url){
    fetch(url).then(res => res.json()).then(data =>{
        console.log(data.results)
        showMovies(data.results);
        showMovies2(data.results);
    })
}
function showMovies(data){
    main.innerHTML='';
  data.forEach(movie =>{
    const{title,poster_path,vote_average,overview,release_date,id} = movie
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
                    
                             
                        
                            <div class="movie-card" >
                                <div class="movie-header theDarkTower">
                                  <img src="${IMG_URL+poster_path}" alt="${title}" class="card-img"/>
                                    <div class="header-icon-container">
                                       
                                    </div>
                                </div><!--movie-header-->
                                <div class="movie-content">
                                    <div class="movie-content-header">
                                        <a href="#">
                                            <h3 class="movie-title">${title}</h3>
                                        </a>
                                        <div class="imax-logo"></div>
                                    </div>
                                    <div class="movie-info">
                                        <div class="info-section">
                                            <label>Rating</label>
                                            <span class="green">${Math.round(vote_average,1)}</span>
                                        </div><!--date,time-->
                                        <div class="info-section ">
                                            <label class="right">Overview</label>
                                            <div class="over_text">
                                                 <span>
                                               <p>
                                                 ${overview}
                                               </p>
                                            </span>
                                            </div>
                                           <button class="btn_overview" id="${id}">
                                            More
                                           </button>
                                        </div><!--screen-->
                                    
                                    </div>
                                </div><!--movie-content-->
                            </div><!--movie-card--> 
                        
                               
    `
    main.appendChild(movieEl);
    document.getElementById(id).addEventListener('click',() =>{
      console.log(id)
      openNav(movie)
    })
  })
};
function openNav(movie) {
  let id = movie.id;
  
  fetch(BASE_URL + '/movie/' + id + '?' + API_KEY)
  .then(res => res.json())
  .then(movieData => {
    console.log(movieData);
    if (movieData) {
      document.getElementById("myNav").style.width = "100%";

      // Extract movie details
      const { title, overview, vote_average,release_date,runtime,origin_country,original_language} = movieData;
      let movieDetails = `
        <h1>${title}</h1>
        <p>${overview}</p>
        <p><strong>Rating:</strong> ${vote_average} <strong class="space">Release Date:</strong> ${release_date} <strong class="space">Runtime:</strong> ${runtime}min  <strong class="space">Country:</strong> ${origin_country} <strong class="space">Original Language:</strong> ${original_language} </p>
      `;

      fetch(BASE_URL + '/movie/' + id + '/videos?' + API_KEY)
        .then(res => res.json())
        .then(videoData => {
          console.log(videoData);
          if (videoData) {
            if (videoData.results.length > 0) {
              var embed = [];
              videoData.results.forEach(video => {
                let { name, key, site } = video;
                if (site === 'YouTube') {
                  embed.push(`
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" class="embed hide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                  `);
                }
              });
             
              document.getElementById("overlayContent").innerHTML = movieDetails + embed.join('');
              activeSlide=0;
              showVideoes();
            } else {
              document.getElementById("overlayContent").innerHTML = movieDetails + `<h1 class="no-results">No results found</h1>`;
            }
          }
        })
        .catch(error => console.error('Error:', error));
    }
  })
  .catch(error => console.error('Error:', error));
  
}

function showMovies2(data){
    main_tab.innerHTML=''
  data.forEach(movie =>{
    const{title,poster_path,vote_average,overview,release_date} = movie
    const movieEl = document.createElement('tr');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
                    

                   
        <tr>
            <th scope="row"></th>
            <td>${title}</td>
            <td>${vote_average}</td>
            <td>${release_date}</td>
        </tr>
                               
    `
    main_tab.appendChild(movieEl);

  })
}
form.addEventListener('submit',(e) =>{
  e.preventDefault();
  const searchTerm = search.value;
  if(searchTerm) {
    getMovies(searchURL+'&query='+searchTerm)
}else{
    getMovies(API_URL);
}
})
document.getElementById("myNav").style.width = "0%";



