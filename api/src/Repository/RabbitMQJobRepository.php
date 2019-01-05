<?php

namespace App\Repository;

use App\Entity\RabbitMQJob;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method RabbitMQJob|null find($id, $lockMode = null, $lockVersion = null)
 * @method RabbitMQJob|null findOneBy(array $criteria, array $orderBy = null)
 * @method RabbitMQJob[]    findAll()
 * @method RabbitMQJob[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RabbitMQJobRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, RabbitMQJob::class);
    }

    // /**
    //  * @return RabbitMQJob[] Returns an array of RabbitMQJob objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('r.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?RabbitMQJob
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
