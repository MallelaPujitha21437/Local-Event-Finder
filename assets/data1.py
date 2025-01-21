import requests

# Your Ticketmaster API key
api_key = 'eAw1K7r1qQmmKU6QBhJcYlk6FZLKDDke'  # Replace this with your actual API key

# Define the endpoint and parameters
url = f"https://app.ticketmaster.com/discovery/v2/events.json?city=&apikey={api_key}"

# Send the GET request
response = requests.get(url)

if response.status_code == 200:
    data = response.json()
    events = data['_embedded']['events']
    for event in events:
        print(f"Event Name: {event['name']}")
        print(f"Date: {event['dates']['start']['localDate']}")
        print(f"Venue: {event['_embedded']['venues'][0]['name']}")
        print(f"Location: {event['_embedded']['venues'][0]['city']['name']}")
        print("-" * 50)
else:
    print(f"Failed to retrieve data. Status Code: {response.status_code}")