const express = require("express");
const Joi     = require("joi");

const port = process.env.PORT || 3000;
const app  = express();
app.use(express.json());

let genres = [  {id: 1, gr: "Rock"},
                {id: 2, gr: "Action"},
                {id: 3, gr: "Comedy"},
                {id: 4, gr: "Thiller"},
                {id: 5, gr: "Horro"},
                {id: 6, gr: "Romantic"}
             ]   


app.get('/api/genres/', (req, res) => {
    res.status(200).send(genres);
})


app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(element => element.id === parseInt(req.params.id));
    if(!genre)
        {
            res.status(404).send("Genre Not Found");
        }
    else
        {
            res.status(200).send(genre);
        }
})

app.post('/api/genres/', (req, res) => {
    const genre = {
                    id: genres.length + 1,
                    gr: req.body.name
                  };
    genres.push(genre);
    res.send(genre);
})




app.listen(port, () => {console.log(`Node App listening on Port ${port}`)});