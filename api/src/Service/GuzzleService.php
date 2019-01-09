<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\GuzzleJob;
use GuzzleHttp\Client;
use Symfony\Component\HttpFoundation\Response;
use App\Service\RunnerInterface;

class GuzzleService implements RunnerInterface
{
    use \App\Service\RunnerTrait;

    /**
     * Entity manager
     *
     * @var EntityManagerInterface
     */
    private $em;

    /**
     * Guzzle client
     *
     * @var Client
     */
    private $guzzleClient;

    /**
     * Contructor
     *
     * @param EntityManagerInterface $em
     * @param Client $guzzleClient
     */
    public function __construct(EntityManagerInterface $em, Client $guzzleClient)
    {
        $this->em = $em;
        $this->guzzleClient = $guzzleClient;
    }

    public function run(int $guzzleJobId): RunnerInterface
    {
        $guzzleJob = $this->em->getRepository(GuzzleJob::class)->find($guzzleJobId);

        $cronJob = $guzzleJob->getCronJob();
        $this->setTimestampFormat($cronJob->getDateFormat())
             ->setJobname($cronJob->getName())
            ;

        $response = $this->guzzleClient->request(
            $guzzleJob->getMethod(),
            $guzzleJob->getUrl(),
            $guzzleJob->getOptions() ? json_decode($guzzleJob->getOptions(), true) : []
        );

        $this->addOutput($response->getBody());

        return $this;
    }
}