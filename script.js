async function searchEvents() {
    const query = document.getElementById('searchQuery').value;
    const url = `/events/${query}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const events = data._embedded ? data._embedded.events : [];
        let eventsHTML = '';

        events.forEach(event => {
            eventsHTML += `
                <div>
                    <h3>${event.name}</h3>
                    <p>${event.dates.start.localDate}</p>
                    <p>${event._embedded.venues[0].name}, ${event._embedded.venues[0].city.name}</p>
                </div>
            `;
        });

        document.getElementById('events').innerHTML = eventsHTML || '<p>No events found.</p>';
    } catch (error) {
        console.error('Error fetching events:', error);
        document.getElementById('events').innerHTML = '<p>Sorry, something went wrong. Please try again.</p>';
    }
}
