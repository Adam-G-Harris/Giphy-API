window.onload = () => {

    // DOM elements
    const display = document.getElementById('gif-display'),
        tagsDisplay = document.getElementById('available-tags'),
        userSearch = document.getElementById('user-search'),
        submit = document.getElementById('submit');

    submit.addEventListener('click', search);
    display.addEventListener('click', runGif);
    tagsDisplay.addEventListener('click', newSearch);

    // Default categories
    let tags = ['elmo', 'dogs', 'cats', 'bears', 'lions', 'sports', 'slides', 'art', 'movies', 'tv shows', 'coding'];

    // Parts of API endpoint
    let key = '&api_key=MEzYteFZFFzEaRw7GkR5tIIPLHyYHndn',
        base = 'https://api.giphy.com/v1/gifs/',
        limit = '&limit=12';

    // Contains Fetch call
    function getGifs(t) {

        // Clean
        display.innerHTML = null;

        // Uses Fetch API to grab argument's gifs
        fetch(base + `search?q=${t}` + key + `&limit=${21}`)
            .then(response => response.json())
            .then(function (data) {

                // Adds gif image & title to DOM
                return data.data.forEach(ele => {

                    // HTML that all gifs receive
                    return display.innerHTML += `<div class='gif-container'>
                                            <img class='gif-output still' src=${ele.images.downsized_still.url}>
                                            <img class='gif-output animate hide' src=${ele.images.downsized.url}>
                                            <div class='gif-rating'>${ele.rating}</div>
                                            </div>`;
                });
            })

            // Error handling
            .catch(function (error) {
                console.log(error);
            })

        return;
    }

    function runGif(e) {

        if (e.target.classList.contains('still')) {

            e.target.classList.toggle('hide');
            e.target.nextElementSibling.classList.toggle('hide');

        } else if (e.target.classList.contains('animate')) {

            e.target.classList.toggle('hide');
            e.target.previousElementSibling.classList.toggle('hide');
        }
    }

    // All gif catagories
    function categories() {

        tagsDisplay.innerHTML = '';

        // Displays current catagories
        for (let i = 0; i < tags.length; i++) {

            tagsDisplay.innerHTML += `<div class='categories'>${tags[i]}</div>`;
        }

        return;
    }

    // Adds gif category
    function search() {

        if (userSearch.value.length) {
            tags.unshift(userSearch.value);
            getGifs(userSearch.value);
            userSearch.value = null;
            categories();
        }

        return;
    }

    // Searches gif library with user input
    function newSearch(e) {

        if (e.target.classList.contains('categories')) {

            getGifs(e.target.textContent);
        }

        return;
    }

    // Init
    (function () {

        // Displays all current categories
        categories();

        // Picks a random category on window load
        getGifs(tags[Math.floor(Math.random() * (tags.length))]);
    })();
};