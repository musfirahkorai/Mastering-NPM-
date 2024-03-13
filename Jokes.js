const https = require('https');

async function getRandomJoke() {
    try {
        // Making a GET request to fetch a random joke
        const response = await new Promise((resolve, reject) => {
            https.get('https://v2.jokeapi.dev/joke/Any', (res) => {
                let data = '';

                // A chunk of data has been received.
                res.on('data', (chunk) => {
                    data += chunk;
                });

                // The whole response has been received.
                res.on('end', () => {
                    resolve(JSON.parse(data));
                });
            }).on('error', (error) => {
                reject(error);
            });
        });

        // Checking if joke type is single or twopart
        let joke;
        if (response.type === 'single') {
            joke = response.joke;
        } else {
            joke = `${response.setup}\n${response.delivery}`;
        }

        return joke;
    } catch (error) {
        console.error('Error fetching joke:', error);
        return 'Sorry, I couldn\'t fetch a joke at the moment.';
    }
}

getRandomJoke()
    .then(joke => console.log(joke))
    .catch(error => console.error('Error:', error));
