import gql from 'graphql-tag';

const queryCronJob = gql`
  query cronJob($id: ID) {
    cronJob(id: $id) {
      id
      name
      schedule
      command
      closure
      runAs
      debug
      environment
      runOnHost
      maxRuntime
      enabled
      haltDir
      output
      outputStdout
      outputStderr
      dateFormat
      recipients
      mailer
      smtpHost
      smtpPort
      smtpUsername
      smtpPassword
      smtpSecurity
      smtpSender
      smtpSenderName
      timeCreated
      timeUpdated
      guzzleJobs {
        edges {
          node {
            id
            name
            method
            url
            options
            timeCreated
            timeUpdated
          }
        }
      }
    }
  }
`;

const mutateCronJob = gql`
  mutation cronJob($input: updateCronJobInput) {
    updateCronJob(input: $input) {
      id
    name
    schedule
    command
    closure
    runAs
    debug
    environment
    runOnHost
    maxRuntime
    enabled
    haltDir
    output
    outputStdout
    outputStderr
    dateFormat
    recipients
    mailer
    smtpHost
    smtpPort
    smtpUsername
    smtpPassword
    smtpSecurity
    smtpSender
    smtpSenderName
    timeCreated
    timeUpdated
    guzzleJobs {
      edges {
        node {
          id
          name
          method
          url
          options
          timeCreated
          timeUpdated
        }
      }
    }
    }
  }
`;

export { queryCronJob, mutateCronJob };
