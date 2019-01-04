import gql from 'graphql-tag';

const updateGuzzleJob = gql`
  mutation guzzleJob($input: updateGuzzleJobInput) {
    updateGuzzleJob(input: $input) {
      id
    }
  }
`;

const createGuzzleJob = gql`
  mutation guzzleJob($input: createGuzzleJobInput) {
    createGuzzleJob(input: $input) {
      id
    }
  }
`;

export { updateGuzzleJob, createGuzzleJob };
