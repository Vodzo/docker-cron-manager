<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use App\Entity\CronJob;
use App\Entity\GuzzleJob;
use App\Entity\RabbitMQJob;

class JobbyFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $cron = new CronJob();
        $cron->setCommand('dir')
             ->setSchedule('* * * * *')
             ->setName('Fixtures test')
             ->setDebug(true)
             ->setEnabled(true)
             ->setTimeCreated(new \DateTime())
             ->setOutput('var/log/default_jobby.log')
             ->setOutputStderr('var/log/default_jobby_err.log')
             ->setOutputStdout('var/log/default_jobby_out.log')
             ;
        
        $guzzleJob = new GuzzleJob();
        $guzzleJob->setName('ping google')
                  ->setUrl('https://www.google.com')
                  ->setMethod('GET')
                  ->setTimeCreated(new \DateTime())
                  ->setOptions(['verify' => false])
                  ;
        $manager->persist($guzzleJob);
        $cron->addGuzzleJob($guzzleJob);
        $manager->persist($cron);

        $rabbitMQJob = new RabbitMQJob();
        $rabbitMQJob->setName('test rabbitMq')
                    ->setHost('localhost')
                    ->setPort(5681)
                    ->setUser('guest')
                    ->setPassword('guest')
                    ->setQueueDurable(true)
                    ->setQueuePassive(true)
                    ->setQueueAutoDelete(true)
                    ->setQueueNoWait(true)
                    ->setQueueExclusive(true)
                    ->setQueueTicket(12)
                    ->setQueueName('fixture queue')
                    ;
        $manager->persist($rabbitMQJob);
        $cron->addRabbitMQJob($rabbitMQJob);
        $manager->flush();
    }
}
