import gql from 'graphql-tag';

const queryCronJobs = gql`
  query cronJobs($search: String){
    cronJobs(name: $search) {
      edges {
        node {
          _id
          id
          name
          schedule
          guzzleJobs {
            edges {
              node {
                _id
                id
                name
                method
                url
                options
              }
            }
          }
        }
      }
    }
  }
`;

export default queryCronJobs;
