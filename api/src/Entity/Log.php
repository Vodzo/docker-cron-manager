<?php
namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiProperty;

/**
 * @ApiResource
 */
class Log
{

  /** @var ?string */
  private $text;

  /**
   * Full log
   *
   * @var string
   */
  private $fullLog;


  /** 
   * @ApiProperty(identifier=true)
   * @var string
   */
  private $id;


  /**
   * File path
   *
   * @var string
   */
  private $path;

  public function getText() : ?string
  {
    return $this->text;
  }

  public function setText(?string $text): self
  {
    $this->text = $text;
    return $this;
  }

  public function getId() : string
  {
    return $this->id;
  }


  public function setId(?string $id): self
  {
    $this->id = $id;
    return $this;
  }


  public function setPath(?string $path): self
  {
    $this->path = $path;
    return $this;
  }


  public function getPath(): ?string
  {
    return $this->path;
  }


  public function setFullLog(?string $fullLog): self
  {
    $this->fullLog = $fullLog;
    return $this;
  }


  public function getFullLog(): ?string
  {
    return $this->fullLog;
  }
}