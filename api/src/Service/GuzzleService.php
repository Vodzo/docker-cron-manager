<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\GuzzleJob;
use GuzzleHttp\Client;
use Symfony\Component\HttpFoundation\Response;

class GuzzleService
{

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
     * @param Jobby $jobby
     */
    public function __construct(EntityManagerInterface $em, Client $guzzleClient)
    {
        $this->em = $em;
        $this->guzzleClient = $guzzleClient;
    }

    public function run(int $guzzleJobId)
    {
        $guzzleJob = $this->em->getRepository(GuzzleJob::class)->find($guzzleJobId);
        $response = $this->guzzleClient->request(
            $guzzleJob->getMethod(),
            $guzzleJob->getUrl(),
            $guzzleJob->getOptions()
        );

        return new Response($response->getBody());
    }
}