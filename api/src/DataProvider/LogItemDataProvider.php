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
        dump($context);
        $cronJobId = $id;
        $cronJob = $this->em->getRepository(CronJob::class)->findOneBy(['id' => $cronJobId]);
        $log = new Log();
        if (!empty($context['attributes']['text'])) {
            $text = $this->logService->tail($cronJob->getOutputStdout(), 10);
            $log->setText($text);
        }
        if (!empty($context['attributes']['path'])) {
            $log->setPath($cronJob->getOutputStdout());
        }
        if (!empty($context['attributes']['fullLog'])) {
            $fullLog = $this->logService->read($cronJob->getOutputStdout());
            $log->setFullLog($fullLog);
        }
        $log->setId('log_' . $cronJobId);

        return $log;
    }
}