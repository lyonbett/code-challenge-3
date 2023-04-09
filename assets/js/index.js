const BASE_URL = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
    fetchFilms();
});

//render films on html
function fetchFilms() {
    fetch(`${BASE_URL}/films`, {
        method: 'GET',
        headers: {
            'content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then(renderFilms)
        .catch((err) => {
            console.log(err);
        });
}

//attach or render films on the html
function renderFilms(films) {

    const listFilmsDiv = document.getElementById('list-films');

    films.forEach((film) => {
        //create a new div element for each film
        const card = document.createElement('div');
        card.innerText = film.title;
        card.classList.add('list-film-item');

        //add an onclick listener
        card.addEventListener('click', () => {
            renderFilmDetails(film);
        });

        //Append each new card to the listFilmsDiv
        listFilmsDiv.appendChild(card);
    });
}

//render one film on the html
async function renderFilmDetails(film) {
    const filmDetailsDiv = document.getElementById('film-details');

    //Reset the filmDetailsDiv
    filmDetailsDiv.innerHTML = '';

    //name the elements
    const nameParagraph = document.createElement('p');
    nameParagraph.innerText = `Tittle: ${film.title}`;

    //showTime element
    const showTimeParagraph = document.createElement('p')
    showTimeParagraph.innerHTML = `Showtime: ${film.showtime}`

    //Runtime element
    const runTimeParagraph = document.createElement('p')
    runTimeParagraph.innerHTML = `Runtime: ${film.runtime}`

    //image element
    const imageElement = document.createElement('img');
    imageElement.src = film.poster;

    //tickets element
    const ticketsParagraph = document.createElement('p');
    remaining_tickets = film.capacity - film.tickets_sold

    ticketsParagraph.innerText = `tickets: ${remaining_tickets}`;

    //add a tickets button
    const addticketsButton = document.createElement('button');
    addticketsButton.innerHTML = '<form action="#" id="form_id"><input id="ticket_number" type="number" placeholder="Ticket number" required><button>Buy Ticket</button></form>';


    addticketsButton.addEventListener('submit', (e) => {
        e.preventDefault()
        ticket_value = document.getElementById('ticket_number').value
        remaining_tickets = film.capacity - film.tickets_sold
        if (ticket_value > remaining_tickets) {
            alert("Not enough")
        } else {
            answer = remaining_tickets - ticket_value
            const newTicket = (remaining_tickets -= 1);
            ticketsParagraph.innerText = `tickets: ${answer}`;
        }


    });



    //attach all the elements
    filmDetailsDiv.appendChild(nameParagraph);
    filmDetailsDiv.appendChild(showTimeParagraph);
    filmDetailsDiv.appendChild(runTimeParagraph);
    filmDetailsDiv.appendChild(imageElement);
    filmDetailsDiv.appendChild(ticketsParagraph);
    filmDetailsDiv.appendChild(addticketsButton);
}


