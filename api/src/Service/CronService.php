<?php

namespace App\Service;

use Jobby\Jobby;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\CronJob;
use JMS\Serializer\SerializerBuilder;
use App\Service\LogRotateService;


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
     * Log Rotate Service
     *
     * @var LogRotateService
     */
    private $logRotate;

    /**
     * Contructor
     *
     * @param Jobby $jobby
     */
    public function __construct(Jobby $jobby, EntityManagerInterface $em, LogRotateService $logRotate)
    {
        $this->jobby = $jobby;
        $this->em = $em;
        $this->logRotate = $logRotate;
    }


    public function run()
    {
        $jobs = $this->em->getRepository(CronJob::class)->findAll();

        /** @var \JMS\Serializer\Serializer $serializer */
        $serializer = SerializerBuilder::create()->build();
        $logRotateQueue = [];

        /** @var CronJob $job */
        foreach ($jobs as $job) {
            foreach($job->getGuzzleJobs() as $guzzle) {
                $config = $serializer->toArray($job);
                $config['command'] = '/usr/local/bin/php -f /var/www/bin/console cron:execute-guzzle ' . $guzzle->getId();
                $this->jobby->add(md5(microtime() . $guzzle->getName() . uniqid()), $config);
            }
            foreach($job->getRabbitMQJobs() as $rabbitMq) {
                $config = $serializer->toArray($job);
                $config['command'] = '/usr/local/bin/php -f /var/www/bin/console cron:execute-rabbitmq ' . $rabbitMq->getId();
                $this->jobby->add(md5(microtime() . $rabbitMq->getName() . uniqid()), $config);
            }
            $logRotateQueue[] = $job->getOutput();
            $logRotateQueue[] = $job->getOutputStdout();
            $logRotateQueue[] = $job->getOutputStderr();
        }
        $this->jobby->run();

        foreach($logRotateQueue as $path) {
            $this->logRotate->rotate($path);
        }

    }
}