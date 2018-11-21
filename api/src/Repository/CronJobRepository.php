<?php

namespace App\Repository;

use App\Entity\CronJob;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method CronJob|null find($id, $lockMode = null, $lockVersion = null)
 * @method CronJob|null findOneBy(array $criteria, array $orderBy = null)
 * @method CronJob[]    findAll()
 * @method CronJob[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CronJobRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, CronJob::class);
    }

    // /**
    //  * @return CronJob[] Returns an array of CronJob objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?CronJob
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
