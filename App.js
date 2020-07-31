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

// Generic GET
app.get('/api/genres/', (req, res) => {
    res.status(200).send(genres);
})

// GET to fetch specific genre
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

// POST to save a genre received in request body with validation
app.post('/api/genres/', (req, res) => {

    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    
    const { error, value } = schema.validate(req.body);
    if (!req.body.name || req.body.name.length < 3) 
        {
            res.status(400).send(error.details[0].message);
            return;
        }   
    else
        {
            const genre = 
            {
                id: genres.length + 1,
                gr: req.body.name
            }
            genres.push(genre);
            res.send(genre);
        }    
})  

// PUT to update a genre for which id is received in URL and genre is received in request body with validation
app.put('/api/genres/:id', (req, res) => {

    const genre = genres.find(element => element.id === parseInt(req.params.id));
    if(!genre)
        {
            res.status(404).send("Genre Not Found");
            return;
        }
    else
        {
            const schema = Joi.object({
                name: Joi.string().min(3).required()
            })
            
            const { error, value } = schema.validate(req.body);
            if (!req.body.name || req.body.name.length < 3) 
                {
                    res.status(400).send(error.details[0].message);
                    return;
                }   
            else
                {   
                   genre.gr = req.body.name;
                   res.send(genre);
                }    
        }    
}) 


// Specific DELETE
app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(element => element.id === parseInt(req.params.id));
    if(!genre)
        {
            res.status(404).send("Genre Not Found");
            return;
        }
    else
        {   
            const index = genres.indexOf(genre);
            genres.splice(index,1);
            res.status(200).send(genre);
        }
})

app.listen(port, () => {console.log(`Node App listening on Port ${port}`)});