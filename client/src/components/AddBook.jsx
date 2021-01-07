import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_BOOK, AUTHOR_LIST, BOOKS_LIST } from "../Graphql/queries";

const AddBook = () => {
  const { loading, error, data } = useQuery(AUTHOR_LIST);
  const [addBook] = useMutation(ADD_BOOK);
  const [authors, setAuthors] = useState([]);
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorID, setAuthorID] = useState("");

  useEffect(() => {
    if (data) {
      //console.log(data);
      setAuthors(data.authors);
    }
  }, [data]);

  if (!error) {
    <div>Error :(</div>;
  }

  const displayAuthors = () => {
    if (loading) {
      return <option>Loading Authors....</option>;
    } else {
      return authors.map((author) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    //console.log(name, genre, authorID);
    addBook({
      variables: {
        name,
        genre,
        authorID,
      },
      refetchQueries: [{ query: BOOKS_LIST }],
    });
  };

  return (
    <form id="add-book" onSubmit={handleChange}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={(e) => setGenre(e.target.value)} />
      </div>
      <div className="field">
        <label>Author:</label>
        <select onChange={(e) => setAuthorID(e.target.value)}>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default AddBook;
