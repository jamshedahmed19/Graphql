import { useQuery } from "@apollo/client";
import { BOOK_DETAILS } from "../Graphql/queries";

const BookDetails = ({ bookID }) => {
  const { loading, error, data } = useQuery(BOOK_DETAILS, {
    variables: {
      ID: bookID,
    },
  });

  const displayBook = () => {
    if (loading) return <p>loading...</p>;
    if (error) return <p>Something went wrong..</p>;
    if (data.book) {
      return (
        <div>
          <h2>{data.book.name}</h2>
          <p>{data.book.genre}</p>
          <p>{data.book.author.name}</p>
          <p>All the books by the author: </p>
          <ul className="other-books">
            {data.book.author.books.map((item) => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <div>No data to display..</div>;
    }
  };

  return (
    <div id="book-details">
      <p>Output Book details Here</p>
      {displayBook(loading, data, error)}
    </div>
  );
};

export default BookDetails;
