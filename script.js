let btn = document.getElementById("inputValue");
let mot = document.getElementById("query");
let apiKey = 'c6d176151ba65e9c16288136ac44c8b2';
let search = document.querySelector('form');
let changer = document.getElementById('changer');

 fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`)
    .then(reponse => reponse.json())
    .then (data => {
                    displayMovie(data.results)
                     console.log(data.results)
    
})

    btn.addEventListener('click', (e)=>{
    e.preventDefault();
    console.log(mot.value);
    if (mot.value) {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${mot.value}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    displayMovie(data.results)
       })
       } else {
           alert("pas de correspondance"); 
       }
   });

    function displayMovie(data) {
        let ecran = document.getElementById("ecran");
        ecran.innerHTML ="";
        if (data.length != 0) {
            for (let i = 0; i < data.length; i++){
                ecran.innerHTML += `<div class="card-group col-3" style="background-image: url("https://image.tmdb.org/t/p/w500${data.poster_path}");>
                    <div class="card">
                        <img class="card-img-top" src="https://image.tmdb.org/t/p/w500${data[i].poster_path}" alt="Card image cap">
                        <div class="card-body">
                        <h5 class="card-title">${data[i].title}</h5>
                    </div>
                </div>`
          
            }
        }
    }

    function DisplayDesc(a) {
                fetch (`https://api.themoviedb.org/3/movie/${a}?api_key=${apiKey}`)
                    .then(reponse => reponse.json())
                    .then (data => {
                        ecran.innerHTML = `
                            <div class="card" id="card" onMouseOver="DisplayDesc(${data.id})">
                               <div class="card-body">
                                    <h5 class="card-title"><a href="#">${data.title}</a></h5>
                                    <p class="card-text">${data.overview}</p>
                               </div>
                               <div class="card-footer">
                                    <small class="text-muted">${data.release_date}</small>
                               </div>
                            </div>
                       `
                    })
                };
                
                search.addEventListener('keyup', (e)=>{
                    e.preventDefault();              
                     if (mot.value) {
                           fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${mot.value}`)
                       .then(response => response.json())
                       .then(data => {
                        let resultats = response.data.results;
                        displayMovie(resultats)
                 
                    })

                     };
                     });



                    
