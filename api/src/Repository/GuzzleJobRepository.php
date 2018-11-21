<?php

namespace App\Repository;

use App\Entity\GuzzleJob;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method GuzzleJob|null find($id, $lockMode = null, $lockVersion = null)
 * @method GuzzleJob|null findOneBy(array $criteria, array $orderBy = null)
 * @method GuzzleJob[]    findAll()
 * @method GuzzleJob[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GuzzleJobRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, GuzzleJob::class);
    }

    // /**
    //  * @return GuzzleJob[] Returns an array of GuzzleJob objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('g')
            ->andWhere('g.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('g.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?GuzzleJob
    {
        return $this->createQueryBuilder('g')
            ->andWhere('g.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
