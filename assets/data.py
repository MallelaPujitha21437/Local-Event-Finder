import requests 

api_key = 'eAw1K7r1qQmmKU6QBhJcYlk6FZLKDDke'
url = f"https://app.ticketmaster.com/discovery/v2/events.json?city=&apikey={api_key}"

response = requests.get(url)
events = response.json()

# Print the event data
print(events)