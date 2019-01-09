<?php

namespace App\DataProvider;

use ApiPlatform\Core\DataProvider\ItemDataProviderInterface;
use ApiPlatform\Core\DataProvider\RestrictedDataProviderInterface;
use ApiPlatform\Core\Exception\ResourceClassNotSupportedException;
use App\Entity\Log;
use App\Service\LogService;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\CronJob;

final class LogItemDataProvider implements ItemDataProviderInterface, RestrictedDataProviderInterface
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

    public function getItem(string $resourceClass, $id, ?string $operationName = null, array $context = []): ?Log
    {
        $cronJobId = $id;
        $cronJob = $this->em->getRepository(CronJob::class)->findOneBy(['id' => $cronJobId]);
        $text = $this->logService->tail($cronJob->getOutputStdout(), 10);
        $log = new Log();
        $log->setText($text);
        $log->setPath($cronJob->getOutputStdout());
        $log->setId('log_' . $cronJobId);

        return $log;
    }
}