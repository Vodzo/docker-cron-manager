<?php

namespace App\Service;
trait RunnerTrait {

  /**
   * Output buffer
   *
   * @var array
   */
  protected $output;

  /**
   * Timestamp format
   *
   * @var string
   */
  protected $timestampFormat;

  /**
   * Job name
   *
   * @var string
   */
  protected $jobName;

  /**
   * Add line to outpus
   *
   * @param string $message
   * @return self
   */
  public function addOutput(string $message): self
  {
    $this->output[] = $message;
    return $this;
  }

  /**
   * Set log timestamp format
   *
   * @param string|null $timestampFormat
   * @return self
   */
  public function setTimestampFormat(?string $timestampFormat): self
  {
    $this->timestampFormat = $timestampFormat;
    return $this;
  }

  /**
   * Set job name
   *
   * @param string|null $jobName
   * @return self
   */
  public function setJobname(?string $jobName): self
  {
    $this->jobName = $jobName;
    return $this;
  }

  /**
   * Get output
   *
   * @return string
   */
  public function getOutput(): string
  {
    return implode('', array_map(function($outputLine) {
      return $this->jobName . ($this->timestampFormat ? '[' . date($this->timestampFormat) . '] ' : '' ) . $outputLine . "\n";
    }, $this->output));
  }
}