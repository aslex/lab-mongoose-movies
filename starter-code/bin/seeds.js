const celebrities = [{
        name: 'Mathew Mcconaughey',
        occupation: 'Actor',
        catchPhrase: 'Alright, alright, alright'
    },
    {
        name: 'Roberto Benigni',
        occupation: 'Actor',
        catchPhrase: 'La vita è bella'
    },
    {
        name: 'Angela Merkel',
        occupation: 'Politician',
        catchPhrase: 'Wir haben so vieles geschafft - wir schaffen das.'
    }
]

const mongoose = require('mongoose');
const Celebrity = require('../model/Celebrity');

mongoose.connect('mongodb://localhost/starter-code');

Celebrity.insertMany(celebrities)
    .then(cel => {
        console.log(cel.length + ' celebrities were added');
        mongoose.connection.close();
    }).catch(err => {
        console.log(err);
    });