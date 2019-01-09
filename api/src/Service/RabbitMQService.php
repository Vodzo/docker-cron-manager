<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\RabbitMQJob;
use Symfony\Component\HttpFoundation\Response;
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;
use PhpAmqpLib\Exception\AMQPRuntimeException;

class RabbitMQService
{

  /**
   * Entity manager
   *
   * @var EntityManagerInterface
   */
  private $em;

  /**
   * Contructor
   *
   * @param Jobby $jobby
   */
  public function __construct(EntityManagerInterface $em)
  {
    $this->em = $em;
  }

  public function run(int $rabbitMQJobId)
  {
    /**
     * @var RabbitMQJob $rabbitMQJob
     */
    $rabbitMQJob = $this->em->getRepository(RabbitMQJob::class)->find($rabbitMQJobId);

    $connection = new AMQPStreamConnection(
      $rabbitMQJob->getHost(),
      $rabbitMQJob->getPort(),
      $rabbitMQJob->getUser(),
      $rabbitMQJob->getPassword()
    );

    $channel = $connection->channel();

    if ($rabbitMQJob->getExchangeName()) {
      $channel->exchange_declare(
        $rabbitMQJob->getExchangeName(),
        $rabbitMQJob->getExchangeType(),
        $rabbitMQJob->getExchangePassive(),
        $rabbitMQJob->getExchangeDurable(),
        $rabbitMQJob->getExchangeAutoDelete(),
        $rabbitMQJob->getExchangeInternal(),
        $rabbitMQJob->getExchangeNoWait(),
        [],
        $rabbitMQJob->getExchangeTicket()
      );
    }

    if ($rabbitMQJob->getQueueName()) {
      $channel->queue_declare(
        $rabbitMQJob->getQueueName(),
        $rabbitMQJob->getQueuePassive(),
        $rabbitMQJob->getQueueDurable(),
        $rabbitMQJob->getQueueExclusive(),
        $rabbitMQJob->getQueueAutoDelete(),
        $rabbitMQJob->getQueueNoWait(),
        [],
        $rabbitMQJob->getQueueTicket()
      );
    }


    $msg = new AMQPMessage($rabbitMQJob->getMessage());
    try {
      $channel->basic_publish($msg, $rabbitMQJob->getExchangeName(), $rabbitMQJob->getRoutingKey());
    } catch(AMQPRuntimeException $e) {
      print('Job failed');
    }
    $channel->close();
    $connection->close();

    return 'Message sent';
  }
}