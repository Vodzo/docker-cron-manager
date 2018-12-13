import gql from 'graphql-tag';

const queryCronJobs = gql`
  query cronJobs($search: String){
    cronJobs(name: $search) {
      edges {
        node {
          id
          name
          schedule
          guzzleJobs {
            edges {
              node {
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
