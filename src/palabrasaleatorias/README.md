# random-spanish-words

## Generate one or more common Spanish words

`random-spanish-words` generates random words for use as sample text.

Installation:

    npm install random-spanish-words

Examples:

    var randomWords = require('random-spanish-words');

    console.log(randomWords());
    hola

    console.log(randomWords(5));
    ['hola', 'amigo', 'volver', 'marca', 'objetivo']

    console.log(randomWords({ min: 3, max: 10 }));
    ['nunca', 'oficial', 'derecho', 'enfermo']

    console.log(randomWords({ exactly: 2 }));
    ['final', 'hablar']

    console.log(randomWords({ exactly: 5, join: ' ' }))
    'hola amigo volver marca objetivo'

