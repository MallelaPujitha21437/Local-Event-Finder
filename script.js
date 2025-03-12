async function searchEvents() {
    const query = document.getElementById('searchQuery').value.trim();

    if (!query) {
        document.getElementById('events').innerHTML = '<p class="error-message">Please enter a city or event type.</p>';
        return;
    }

    const url = `/events/${query}`;
    document.getElementById('events').innerHTML = '<p class="loading-message">Loading events...</p>';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }

        const data = await response.json();
        const events = data._embedded ? data._embedded.events : [];

        if (events.length === 0) {
            document.getElementById('events').innerHTML = '<p class="no-events">No events found.</p>';
            return;
        }

        let eventsHTML = events.map(event => `
            <div class="event-card">
                <h3>${event.name}</h3>
                <p>${event.dates.start.localDate}</p>
                <p>${event._embedded.venues[0].name}, ${event._embedded.venues[0].city.name}</p>
            </div>
        `).join('');

        document.getElementById('events').innerHTML = eventsHTML;
    } catch (error) {
        console.error('Error fetching events:', error);
        document.getElementById('events').innerHTML = '<p class="error-message">Sorry, something went wrong. Please try again later.</p>';
    }
}

// Add Enter key functionality
document.getElementById('searchQuery').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        searchEvents();
    }
});
