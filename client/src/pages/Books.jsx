import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios'; //A js library that makes it easy to make HTTP req, both on client-side and server-side js applications.

const Books = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8800/books");
                setBooks(res.data);
                console.log(res);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchAllBooks();
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:8800/books/" + id);
            window.location.reload();
        }
        catch (err) {
            console.log(err);
        }
    }

    return <div>
        <h1>Murad's Reading Cafe</h1>
        <div className="books">
            {books.map(book => (
                <div className="book" key={book.id}>
                    {book.cover && <img src={book.cover} alt="" />}
                    <h2>{book.title}</h2>
                    <p>{book.desc}</p>
                    <span>{book.price}</span>
                    <button className="delete" onClick={() => { handleDelete(book.id) }}>Delete</button>
                    <button className="update"><Link to={`/update/${book.id}`}>Update</Link></button>
                </div>
            ))}
        </div>
        <button><Link to="/add">Add a new book</Link ></button>
    </div>;

}

export default Books