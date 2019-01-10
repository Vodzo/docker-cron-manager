<?php

/**
 * Healthcheck controller
 *
 * @category   Controller
 * @package    Ats
 * @author     Vojislav Zelić <vojislav.zelic@infostud.com>
 */

namespace App\Controller;

use Doctrine\DBAL\Exception\ConnectionException;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Profiler\Profiler;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Healthcheck class
 */
class HealthController
{
  /**
   * @var EntityManagerInterface
   */
  private $em;

  /**
   * @var null|Profiler
   */
  private $profiler;

  /**
   * HealthcheckController constructor.
   * @param EntityManagerInterface $em
   * @param null|Profiler $profiler
   */
  public function __construct(
    EntityManagerInterface $em,
    ? Profiler $profiler
  ) {
    $this->em = $em;
    $this->profiler = $profiler;
  }


  /**
   * Healthcheck for Docker
   *
   * @Route("/api/health", methods={"GET"})
      *
   * @return Response
   */
  public function getHealth()
  {
        // $profiler won't be set if your environment doesn't have the profiler (like prod, by default)

    if ($this->profiler !== null) {
            // if it exists, disable the profiler for this particular controller action
      $this->profiler->disable();
    }

        // Test connection to database

    try {
      $this->em->getConnection()->connect();
    }
    /** @noinspection PhpRedundantCatchClauseInspection */ catch (ConnectionException $ex) {
      return new Response('Failed to connect to database.', Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    return new Response('OK');
  }
}
