<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\RabbitMQJobRepository")
 */
class RabbitMQJob
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $host;

    /**
     * @ORM\Column(type="integer")
     */
    private $port;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $user;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $vhost;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $queueName;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $queuePassive = false;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $queueDurable = false;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $queueExclusive = false;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $queueAutoDelete = false;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $queueNoWait = false;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $queueTicket = null;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $exchangeName;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $exchangeType = false;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $exchangePassive = false;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $exchangeDurable = false;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $exchangeAutoDelete = false;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $exchangeInternal = false;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $exchangeNoWait = false;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $exchangeTicket = null;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\CronJob", inversedBy="rabbitMQJobs")
     * @ORM\JoinColumn(name="cronJobId", referencedColumnName="id")
     */
    private $cronJob;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $message = '';

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getHost(): ?string
    {
        return $this->host;
    }

    public function setHost(string $host): self
    {
        $this->host = $host;

        return $this;
    }

    public function getPort(): ?int
    {
        return $this->port;
    }

    public function setPort(int $port): self
    {
        $this->port = $port;

        return $this;
    }

    public function getUser(): ?string
    {
        return $this->user;
    }

    public function setUser(string $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getVhost(): ?string
    {
        return $this->vhost;
    }

    public function setVhost(?string $vhost): self
    {
        $this->vhost = $vhost;

        return $this;
    }

    public function getQueueName(): ?string
    {
        return $this->queueName;
    }

    public function setQueueName(?string $queueName): self
    {
        $this->queueName = $queueName;

        return $this;
    }

    public function getQueuePassive(): ?bool
    {
        return $this->queuePassive;
    }

    public function setQueuePassive(bool $queuePassive): self
    {
        $this->queuePassive = $queuePassive;

        return $this;
    }

    public function getQueueDurable(): ?bool
    {
        return $this->queueDurable;
    }

    public function setQueueDurable(bool $queueDurable): self
    {
        $this->queueDurable = $queueDurable;

        return $this;
    }

    public function getQueueExclusive(): ?bool
    {
        return $this->queueExclusive;
    }

    public function setQueueExclusive(?bool $queueExclusive): self
    {
        $this->queueExclusive = $queueExclusive;

        return $this;
    }

    public function getQueueAutoDelete(): ?bool
    {
        return $this->queueAutoDelete;
    }

    public function setQueueAutoDelete(?bool $queueAutoDelete): self
    {
        $this->queueAutoDelete = $queueAutoDelete;

        return $this;
    }

    public function getQueueNoWait(): ?string
    {
        return $this->queueNoWait;
    }

    public function setQueueNoWait(?string $queueNoWait): self
    {
        $this->queueNoWait = $queueNoWait;

        return $this;
    }

    public function getQueueTicket(): ?int
    {
        return $this->queueTicket;
    }

    public function setQueueTicket(?int $queueTicket): self
    {
        $this->queueTicket = $queueTicket;

        return $this;
    }

    public function getExchangeName(): ?string
    {
        return $this->exchangeName;
    }

    public function setExchangeName(?string $exchangeName): self
    {
        $this->exchangeName = $exchangeName;

        return $this;
    }

    public function getExchangeType(): ?string
    {
        return $this->exchangeType;
    }

    public function setExchangeType(?string $exchangeType): self
    {
        $this->exchangeType = $exchangeType;

        return $this;
    }

    public function getExchangePassive(): ?bool
    {
        return $this->exchangePassive;
    }

    public function setExchangePassive(?bool $exchangePassive): self
    {
        $this->exchangePassive = $exchangePassive;

        return $this;
    }

    public function getExchangeDurable(): ?bool
    {
        return $this->exchangeDurable;
    }

    public function setExchangeDurable(?bool $exchangeDurable): self
    {
        $this->exchangeDurable = $exchangeDurable;

        return $this;
    }

    public function getExchangeAutoDelete(): ?bool
    {
        return $this->exchangeAutoDelete;
    }

    public function setExchangeAutoDelete(?bool $exchangeAutoDelete): self
    {
        $this->exchangeAutoDelete = $exchangeAutoDelete;

        return $this;
    }

    public function getExchangeInternal(): ?bool
    {
        return $this->exchangeInternal;
    }

    public function setExchangeInternal(?bool $exchangeInternal): self
    {
        $this->exchangeInternal = $exchangeInternal;

        return $this;
    }

    public function getExchangeNoWait(): ?bool
    {
        return $this->exchangeNoWait;
    }

    public function setExchangeNoWait(?bool $exchangeNoWait): self
    {
        $this->exchangeNoWait = $exchangeNoWait;

        return $this;
    }

    public function getExchangeTicket(): ?int
    {
        return $this->exchangeTicket;
    }

    public function setExchangeTicket(?int $exchangeTicket): self
    {
        $this->exchangeTicket = $exchangeTicket;

        return $this;
    }

    public function getCronJob(): ?CronJob
    {
        return $this->cronJob;
    }

    public function setCronJob(?CronJob $cronJob): self
    {
        $this->cronJob = $cronJob;

        return $this;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(?string $message): self
    {
        $this->message = $message;

        return $this;
    }
}
