import { gql } from "@apollo/client";

export const BOOKS_LIST = gql`
  query {
    books {
      id
      name
      genre
    }
  }
`;

export const AUTHOR_LIST = gql`
  query {
    authors {
      name
      age
    }
  }
`;

export const ADD_BOOK = gql`
  mutation AddBook($name: String!, $genre: String!, $authorID: ID!) {
    addBook(name: $name, genre: $genre, authorID: $authorID) {
      name
      id
    }
  }
`;

export const BOOK_DETAILS = gql`
  query($ID: ID) {
    book (id: $ID){
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;
