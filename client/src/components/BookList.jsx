import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { BOOKS_LIST } from "../Graphql/queries";
import BookDetails from "./BookDetails";

const BookList = () => {
  const { loading, error, data } = useQuery(BOOKS_LIST);
  const [books, setBooks] = useState([]);
  const [bookID, setBookID] = useState(null);

  useEffect(() => {
    if (data) {
      //console.log(data);
      setBooks(data.books);
    }
  }, [data]);

  if (!error) {
    <div>Error :(</div>;
  }

  const displayBooks = () => {
    if (loading) {
      return <div>Loading Books....</div>;
    } else {
      return books.map((book) => {
        return (
          <li key={book.id} onClick={() => setBookID(book.id)}>
            {book.name}
          </li>
        );
      });
    }
  };
  console.log(bookID);
  return (
    <div>
      <ul id="book-list">{displayBooks()}</ul>
      <BookDetails bookID={bookID} />
    </div>
  );
};

export default BookList;
