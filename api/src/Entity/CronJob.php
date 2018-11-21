<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CronJobRepository")
 */
class CronJob
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
    private $schedule;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $command;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $closure;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $runAs;

    /**
     * @ORM\Column(type="boolean")
     */
    private $debug;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $environment;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $runOnHost;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $maxRuntime;

    /**
     * @ORM\Column(type="boolean")
     */
    private $enabled;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $haltDir;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $output = "/dev/null";

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $output_stdout = "/dev/null";

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $output_stderr = "/dev/null";

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $dateFormat = "Y-m-d H:i:s";

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $recipients;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $mailer = 'sendmail';

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $smtpHost;

    /**
     * @ORM\Column(type="integer")
     */
    private $smtpPort = 25;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $smtpUsername;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $smtpPassword;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $smtpSecurity;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $smtpSender;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $smtpSenderName;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSchedule(): ?string
    {
        return $this->schedule;
    }

    public function setSchedule(string $schedule): self
    {
        $this->schedule = $schedule;

        return $this;
    }

    public function getCommand(): ?string
    {
        return $this->command;
    }

    public function setCommand(?string $command): self
    {
        $this->command = $command;

        return $this;
    }

    public function getClosure(): ?string
    {
        return $this->closure;
    }

    public function setClosure(?string $closure): self
    {
        $this->closure = $closure;

        return $this;
    }

    public function getRunAs(): ?string
    {
        return $this->runAs;
    }

    public function setRunAs(?string $runAs): self
    {
        $this->runAs = $runAs;

        return $this;
    }

    public function getDebug(): ?bool
    {
        return $this->debug;
    }

    public function setDebug(bool $debug): self
    {
        $this->debug = $debug;

        return $this;
    }

    public function getEnvironment(): ?string
    {
        return $this->environment;
    }

    public function setEnvironment(?string $environment): self
    {
        $this->environment = $environment;

        return $this;
    }

    public function getRunOnHost(): ?string
    {
        return $this->runOnHost;
    }

    public function setRunOnHost(?string $runOnHost): self
    {
        $this->runOnHost = $runOnHost;

        return $this;
    }

    public function getMaxRuntime(): ?int
    {
        return $this->maxRuntime;
    }

    public function setMaxRuntime(?int $maxRuntime): self
    {
        $this->maxRuntime = $maxRuntime;

        return $this;
    }

    public function getEnabled(): ?bool
    {
        return $this->enabled;
    }

    public function setEnabled(bool $enabled): self
    {
        $this->enabled = $enabled;

        return $this;
    }

    public function getHaltDir(): ?string
    {
        return $this->haltDir;
    }

    public function setHaltDir(?string $haltDir): self
    {
        $this->haltDir = $haltDir;

        return $this;
    }

    public function getOutput(): ?string
    {
        return $this->output;
    }

    public function setOutput(string $output): self
    {
        $this->output = $output;

        return $this;
    }

    public function getOutputStdout(): ?string
    {
        return $this->output_stdout;
    }

    public function setOutputStdout(?string $output_stdout): self
    {
        $this->output_stdout = $output_stdout;

        return $this;
    }

    public function getOutputStderr(): ?string
    {
        return $this->output_stderr;
    }

    public function setOutputStderr(?string $output_stderr): self
    {
        $this->output_stderr = $output_stderr;

        return $this;
    }

    public function getDateFormat(): ?string
    {
        return $this->dateFormat;
    }

    public function setDateFormat(string $dateFormat): self
    {
        $this->dateFormat = $dateFormat;

        return $this;
    }

    public function getRecipients(): ?string
    {
        return $this->recipients;
    }

    public function setRecipients(?string $recipients): self
    {
        $this->recipients = $recipients;

        return $this;
    }

    public function getMailer(): ?string
    {
        return $this->mailer;
    }

    public function setMailer(string $mailer): self
    {
        $this->mailer = $mailer;

        return $this;
    }

    public function getSmtpHost(): ?string
    {
        return $this->smtpHost;
    }

    public function setSmtpHost(?string $smtpHost): self
    {
        $this->smtpHost = $smtpHost;

        return $this;
    }

    public function getSmtpPort(): ?int
    {
        return $this->smtpPort;
    }

    public function setSmtpPort(int $smtpPort): self
    {
        $this->smtpPort = $smtpPort;

        return $this;
    }

    public function getSmtpUsername(): ?string
    {
        return $this->smtpUsername;
    }

    public function setSmtpUsername(?string $smtpUsername): self
    {
        $this->smtpUsername = $smtpUsername;

        return $this;
    }

    public function getSmtpPassword(): ?string
    {
        return $this->smtpPassword;
    }

    public function setSmtpPassword(?string $smtpPassword): self
    {
        $this->smtpPassword = $smtpPassword;

        return $this;
    }

    public function getSmtpSecurity(): ?string
    {
        return $this->smtpSecurity;
    }

    public function setSmtpSecurity(?string $smtpSecurity): self
    {
        $this->smtpSecurity = $smtpSecurity;

        return $this;
    }

    public function getSmtpSender(): ?string
    {
        return $this->smtpSender;
    }

    public function setSmtpSender(?string $smtpSender): self
    {
        $this->smtpSender = $smtpSender;

        return $this;
    }

    public function getSmtpSenderName(): ?string
    {
        return $this->smtpSenderName;
    }

    public function setSmtpSenderName(?string $smtpSenderName): self
    {
        $this->smtpSenderName = $smtpSenderName;

        return $this;
    }
}
