import gql from 'graphql-tag';

const rabbitMQJobFragment = gql`
  fragment rabbitMQJobFragment on RabbitMQJob {
    id
    _id
    name
    host
    port
    user
    password
    vhost
    queueName
    queuePassive
    queueDurable
    queueExclusive
    queueAutoDelete
    queueNoWait
    queueTicket
    exchangeName
    exchangeType
    exchangePassive
    exchangeDurable
    exchangeAutoDelete
    exchangeInternal
    exchangeNoWait
    exchangeTicket
    routingKey
    message
  }
`;

const queryRabbitMQJob = null;

const updateRabbitMQJob = gql`
  mutation rabbitMQJob($input: updateRabbitMQJobInput) {
    updateRabbitMQJob(input: $input) {
      rabbitMQJob {
        id
      }
    }
  }
`;

const createRabbitMQJob = gql`
  mutation rabbitMQJob($input: createRabbitMQJobInput) {
    createRabbitMQJob(input: $input) {
      rabbitMQJob {
        id
      }
    }
  }
`;

export {
  rabbitMQJobFragment, queryRabbitMQJob, updateRabbitMQJob, createRabbitMQJob,
};
