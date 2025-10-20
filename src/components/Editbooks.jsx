// import { useEffect, useState } from "react"
// import { useNavigate, useParams } from "react-router-dom";

// import { useEffect, useState } from "react"
//import { useNavigate, useParams } from "react-router-dom";

// export default function EditBooks(){
//     const {id} =useParams();
//     const navigate=useNavigate()
//     const [books,setBooks]=useState({
//         title:"",
//         category:"",
//         photo:"",
//         dop:"",
        
//     });

//     useEffect(()=>{
//         async function fetchbooks() {
//             let response=await fetch(`http://localhost:5000/books/${id}`);
//             let data=await response.json()
//             setBooks(data)
            
//         }
//         fetchbooks()
//     },[id])

//     const handleChange=(e)=>{
//         setBooks({...books,[e.target.name]:e.target.value});
         
//     }

//     const handleSave=(e)=>{
//         e.preventDefault();
//         fetch(`http://localhost:5000/books/${id}`,{
//             method:"PUT",
//             headers:{"Content-Type":"application/json"},
//             body:JSON.stringify(books),
//         }).then(()=>navigate("/"))
//     };



//     return(
//         <>
//         <div>
//             <h1>Edit Store_Book</h1>
//             <form onSubmit={handleSave}>
//                 <div>
//                     <label>Edit Title</label>
//                     <input type="text" name="title" value={books.title|| ""} onChange={handleChange}/>
//                 </div>
//                 <div>
//                     <label>Edit Category</label>
//                     <input type="text" name="category"  value={books.category || ""} onChange={handleChange} />
//                 </div>
//                 <div>
//                     <label>Edit Photo</label>
//                     <input type="text" name="photo" value={books.photo || ""} onChange={handleChange} />
//                 </div>
//                 <div>
//                     <label>Edit dop</label>
//                     <input type="text" name="dop"  value={books.dop || ""} onChange={handleChange}/>
//                 </div>
//                 <button type="submit">save</button>
//             </form>
//         </div>
//         </>
//     )
// }


import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditBooks.css';

export default function EditBook() {
  const { idk } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: '',
    category: '',
    price: '',
    photo: '',
  });

  useEffect(() => {
    fetch(`http://localhost:5000/books/${idk}`)
      .then(res => res.json())
      .then(data => setBook(data))
      .catch(err => console.error(err));
  }, [idk]);

  function handleChange(e) {
    setBook(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/books/${idk}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
      });

      if (response.ok) {
        alert('Book updated successfully!');
        navigate('/');
      } else {
        alert('Failed to update book');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating book');
    }
  }

  return (
    <div className="editbook-container">
      <form className="editbook-form" onSubmit={handleUpdate}>
        <h2 className="editbook-title">Edit Book</h2>
        <input
          className="editbook-input"
          type="text"
          name="title"
          value={book.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <input
          className="editbook-input"
          type="text"
          name="category"
          value={book.category}
          onChange={handleChange}
          placeholder="Category"
        />
        <input
          className="editbook-input"
          type="number"
          name="price"
          value={book.price}
          onChange={handleChange}
          placeholder="Price"
          step="0.01"
          required
        />
        <input
          className="editbook-input"
          type="text"
          name="photo"
          value={book.photo}
          onChange={handleChange}
          placeholder="Photo URL"
        />
        <button className="editbook-btn" type="submit">Update</button>
      </form>
    </div>
  );
}
