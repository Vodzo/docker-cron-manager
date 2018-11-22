<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\GuzzleJobRepository")
 */
class GuzzleJob
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
    private $method;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $url;

    /**
     * @ORM\Column(type="json", nullable=true)
     */
    private $options = [];

    /**
     * @ORM\Column(type="datetime")
     */
    private $timeCreated;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $timeUpdated;

     /**
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\CronJob", inversedBy="guzzleJobs")
     * @ORM\JoinColumn(name="cronJobId", referencedColumnName="id")
     */
    private $cronJob;


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

    public function getMethod(): ?string
    {
        return $this->method;
    }

    public function setMethod(string $method): self
    {
        $this->method = $method;

        return $this;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(string $url): self
    {
        $this->url = $url;

        return $this;
    }

    public function getOptions(): ?array
    {
        return $this->options;
    }

    public function setOptions(?array $options): self
    {
        $this->options = $options;

        return $this;
    }

    public function getTimeCreated(): ?\DateTimeInterface
    {
        return $this->timeCreated;
    }

    public function setTimeCreated(\DateTimeInterface $timeCreated): self
    {
        $this->timeCreated = $timeCreated;

        return $this;
    }

    public function getTimeUpdated(): ?\DateTimeInterface
    {
        return $this->timeUpdated;
    }

    public function setTimeUpdated(?\DateTimeInterface $timeUpdated): self
    {
        $this->timeUpdated = $timeUpdated;

        return $this;
    }

    /**
     * @return CronJob
     */
    public function getCronJob(): CronJob
    {
        return $this->cronJob;
    }

    /**
     * @param CronJob|null $cronJob
     * @return GuzzleJob
     */
    public function setCronJob(?CronJob $cronJob): self
    {
        $this->cronJob = $cronJob;

        return $this;
    }

}
