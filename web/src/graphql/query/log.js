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

const queryLogJobFull = gql`
  query log($id: ID) {
    log(id: $id) {
      id
      fullLog
      path
      _id
    }
  }
`;

export { queryLogJob, queryLogJobFull };
