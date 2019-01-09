<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use App\Entity\CronJob;
use App\Entity\RabbitMQJob;

class RabbitMQFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $cron = new CronJob();
        $cron->setCommand('dir')
             ->setSchedule('* * * * *')
             ->setName('RabbitMQ Test')
             ->setDebug(true)
             ->setEnabled(true)
             ->setTimeCreated(new \DateTime())
             ->setOutput('var/log/rabbitmq.log')
             ->setOutputStderr('var/log/rabbitmq_err.log')
             ->setOutputStdout('var/log/rabbitmq_out.log')
             ;

        $rabbitMQJob = new RabbitMQJob();
        $rabbitMQJob->setName('test rabbitMq')
                    ->setHost('ubuntu.test')
                    ->setPort('5672')
                    ->setUser('guest')
                    ->setPassword('guest')
                    ->setQueueDurable(false)
                    ->setQueuePassive(false)
                    ->setQueueAutoDelete(false)
                    ->setQueueNoWait(false)
                    ->setQueueExclusive(false)
                    ->setQueueTicket(null)
                    ->setQueueName(null)
                    ->setExchangeName('gc')
                    ->setExchangePassive(true)
                    ->setExchangeDurable(false)
                    ->setExchangeAutoDelete(false)
                    ->setExchangeInternal(false)
                    ->setExchangeNoWait(false)
                    ->setExchangeType('fanout')
                    ->setExchangeTicket(null)
                    ->setMessage('')
                    ->setRoutingKey('gc')
                    ;
        $manager->persist($rabbitMQJob);
        $cron->addRabbitMQJob($rabbitMQJob);
        $manager->persist($cron);
        $manager->flush();
    }
}
