const express = require('express');
const Book = require('../models/app.model');
const { verifyAccessToken } = require('../jwt');
const router = express.Router();

// get all records 
router.get('/', verifyAccessToken,  async (req, res) => {

    try {
        const books = await Book.find();
        res.send({ books });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// get one collection by id 
router.get('/:id', verifyAccessToken, async (req, res) => {

    try {

        const { id } = req.params;

        const book = await Book.findById(id);

        if (book) {
            res.send(book);
        }

        else {
            res.status(404).json({ err: "book not found" });
        }

    } catch (error) {
        res.status(500).json({ error: "Book not found" });
    }

});

// create a new record 
router.post('/', verifyAccessToken, async (req, res) => {

    try {
        const { title, author, pages, genre } = req.body;

        const newBook = new Book(req.body);

        const result = await newBook.save()

        res.send(result);

    } catch (error) {
        if(error.code === 11000){
            res.status(401).send({error: "Book already exists"});
        }
        res.status(500).json({ error: error.message });
    }

});


// update a collection by id 
router.put('/:id', verifyAccessToken, async (req, res) => {

    try {
        const { id } = req.params;

        const book = await Book.findByIdAndUpdate(id, req.body);

        const updated = await Book.findOne(book._id);
        res.send(updated);
    } catch(error) {
        res.status(500).json({ error: "Book with given id did not found" });
    }
});


// delete a collection by id 
router.delete('/:id', verifyAccessToken, async(req, res) => {

    try {
        const {id} = req.params;

        const book = await Book.findByIdAndDelete(id);

        if(!book){
            res.status(400).send({err: `Book with id: ${id} not found`});
        }

        res.send("Book deleted successfully");
    } catch (error) {
        res.status(500).send({error: "Book not found"});
    }
})

module.exports = router;