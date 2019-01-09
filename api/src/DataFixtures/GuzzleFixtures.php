<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use App\Entity\CronJob;
use App\Entity\GuzzleJob;

class GuzzleFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $cron = new CronJob();
        $cron->setCommand('dir')
             ->setSchedule('* * * * *')
             ->setName('Guzzle test')
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
                  ->setOptions(json_encode(['verify' => false], JSON_PRETTY_PRINT))
                  ;
        $manager->persist($guzzleJob);
        $cron->addGuzzleJob($guzzleJob);
        $manager->persist($cron);
        $manager->flush();
    }
}
