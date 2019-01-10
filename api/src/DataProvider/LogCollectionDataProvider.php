<?php

namespace App\DataProvider;

use ApiPlatform\Core\DataProvider\CollectionDataProviderInterface;
use ApiPlatform\Core\DataProvider\RestrictedDataProviderInterface;
use ApiPlatform\Core\Exception\ResourceClassNotSupportedException;
use App\Entity\Log;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\LogService;
use App\Entity\CronJob;

final class LogCollectionDataProvider implements CollectionDataProviderInterface, RestrictedDataProviderInterface
{

  /**
   * Log Service
   *
   * @var LogService
   */
  private $logService;

  /**
   * Entity Manager
   *
   * @var EntityManagerInterface
   */
  private $em;

  public function __construct(LogService $logService, EntityManagerInterface $em)
  {
    $this->logService = $logService;
    $this->em = $em;
  }


  public function supports(string $resourceClass, string $operationName = null, array $context = []) : bool
  {
    return Log::class === $resourceClass;
  }

  public function getCollection(string $resourceClass, string $operationName = null) : \Generator
  {
    $cronJobs = $this->em->getRepository(CronJob::class)->findAll();
    foreach($cronJobs as $cronJob) {
      $log = new Log();
      $log->setId('log_' . $cronJob->getId());
      $log->setPath($cronJob->getOutputStdout());
      yield $log;
    }
  }
}