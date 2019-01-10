<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\RabbitMQJob;
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;
use PhpAmqpLib\Exception\AMQPRuntimeException;
use App\Service\RunnerInterface;

class RabbitMQService implements RunnerInterface
{
  use \App\Service\RunnerTrait;

  /**
   * Entity manager
   *
   * @var EntityManagerInterface
   */
  private $em;

  /**
   * Contructor
   *
   * @param EntityManagerInterface $em
   */
  public function __construct(EntityManagerInterface $em)
  {
    $this->em = $em;
  }

  public function run(int $rabbitMQJobId): RunnerInterface
  {
    /**
     * @var RabbitMQJob $rabbitMQJob
     */
    $rabbitMQJob = $this->em->getRepository(RabbitMQJob::class)->find($rabbitMQJobId);

    $cronJob = $rabbitMQJob->getCronJob();
    $this->setTimestampFormat($cronJob->getDateFormat())
         ->setJobname($cronJob->getName())
         ;

    try {
      $connection = new AMQPStreamConnection(
        $rabbitMQJob->getHost(),
        $rabbitMQJob->getPort(),
        $rabbitMQJob->getUser(),
        $rabbitMQJob->getPassword()
      );
    } catch(\ErrorException $e) {
      $this->addOutput('Failed to connect');
      return $this;
    }
    

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
      $this->addOutput('Job failed');
    } finally {
      $channel->close();
      $connection->close();
    }

    $this->addOutput('RabbitMQ job ' . $rabbitMQJob->getName() . ' executed successfully');

    return $this;
  }
}