const express = require('express');
const knex = require('knex')(require('./knexfile.js').development);
const app = express();
const port = 8081;
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`Application up and running on port ${port}`);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });


// Get request to retrieve all users from the database
app.get('/User', (req, res) => {
    knex.select()
        .from('User')
        .then(data => res.status(200).json(data));
    }
);

// Get request to retrieve all items from the database
app.get('/Item', (req, res) => {
    knex.select()
        .from('Item')
        .then(data => res.status(200).json(data));
    }
);

// Get specific item from the database
app.get('/Item/:id', async (req, res) => {
    knex('Item')
        .select('*')
        .where('id', req.params.id)
        .then(item => {
            res.status(200).json(item);
        })
})


// Post request to add a new user to the database
app.post('/User', async(req, res) => {
    await knex('User').insert({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: req.body.password
        })
        .then(() => {
            knex.select()
                .from('User')
                .then(data => res.status(200).json(data));
        });
    }
);

// Post request to add a new item to the database
app.post('/Item', async(req, res) => {
    await knex('Item').insert({
        userId: req.body.userId,
        item_name: req.body.item_name,
        description: req.body.description,
        quantity: req.body.quantity
        })
        .then(() => {
            knex.select()
                .from('Item')
                .then(data => res.status(200).json(data));
        });
    }
);

// Delete request to delete an Item from the database
app.delete('/Item/:id', async(req, res) => {
    await knex('Item').where('id', req.params.id).del()
        .then(() => {
            knex.select()
                .from('Item')
                .then(data => res.status(200).json(data));
        });
    }
);