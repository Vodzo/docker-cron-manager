<?php

namespace App\DataProvider;

use ApiPlatform\Core\DataProvider\CollectionDataProviderInterface;
use ApiPlatform\Core\DataProvider\RestrictedDataProviderInterface;
use ApiPlatform\Core\DataProvider\ItemDataProviderInterface;
use ApiPlatform\Core\Exception\ResourceClassNotSupportedException;
use App\Entity\Log;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\LogService;
use App\Entity\CronJob;

final class LogDataProvider implements CollectionDataProviderInterface, ItemDataProviderInterface, RestrictedDataProviderInterface
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
    foreach ($cronJobs as $cronJob) {
      yield $this->getItem($resourceClass, $cronJob->getId(), $operationName);
    }
  }

  public function getItem(string $resourceClass, $id, ? string $operationName = null, array $context = []) : ? Log
  {
    $cronJobId = $id;
    $cronJob = $this->em->getRepository(CronJob::class)->findOneBy(['id' => $cronJobId]);
    $log = new Log();
    $logPath = $cronJob->getOutputStdout() ? $cronJob->getOutputStdout() : $cronJob->getOutput();
    if ($logPath) {
      if (!empty($context['attributes']['text'])) {
        $text = $this->logService->tail($logPath, 10);
        $log->setText($text);
      }
      if (!empty($context['attributes']['path'])) {
        $log->setPath($logPath);
      }
      if (!empty($context['attributes']['fullLog'])) {
        $fullLog = $this->logService->read($logPath);
        $log->setFullLog($fullLog);
      }
    }
    $log->setId('log_' . $cronJobId);

    return $log;
  }
}