import gql from 'graphql-tag';

const guzzleJobFragment = gql`
  fragment guzzleJobFragment on GuzzleJob {
    _id
    id
    name
    method
    url
    options
    timeCreated
    timeUpdated
  }
`;

const updateGuzzleJob = gql`
  mutation guzzleJob($input: updateGuzzleJobInput) {
    updateGuzzleJob(input: $input) {
      guzzleJob{
        id
      }
    }
  }
`;

const createGuzzleJob = gql`
  mutation guzzleJob($input: createGuzzleJobInput) {
    createGuzzleJob(input: $input) {
      guzzleJob{
        id
      }
    }
  }
`;

export { updateGuzzleJob, createGuzzleJob, guzzleJobFragment };
