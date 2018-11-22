<?php

namespace App\Service;

use Jobby\Jobby;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\CronJob;
use JMS\Serializer\SerializerBuilder;


class CronService
{
    /**
     * Jobby
     *
     * @var Jobby
     */
    private $jobby;

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
    public function __construct(Jobby $jobby, EntityManagerInterface $em)
    {
        $this->jobby = $jobby;
        $this->em = $em;
    }


    public function run()
    {
        $jobs = $this->em->getRepository(CronJob::class)->findAll();

        $serializer = SerializerBuilder::create()->build();
        

        foreach ($jobs as $job) {
            foreach($job->getGuzzleJobs() as $guzzle) {
                $config = $serializer->toArray($job);
                $config['command'] = 'php -f bin/console cron:execute-guzzle ' . $guzzle->getId();
                $this->jobby->add(md5(microtime() . $guzzle->getName() . uniqid()), $config);
            }
        }
        $this->jobby->run();
    }
}