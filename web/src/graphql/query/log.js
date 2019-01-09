import gql from 'graphql-tag';

const queryLogJob = gql`
  query log($id: ID) {
    log(id: $id) {
      id
      text
      path
      _id
    }
  }
`;

export default queryLogJob;
