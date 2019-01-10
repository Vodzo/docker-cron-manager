<?php

namespace App\Service;

use studio24\Rotate\Rotate;

class LogRotateService
{

  /**
   * Log size to rotate
   *
   * @var string
   */
  private $logSize;

  /**
   * Max file size before rotate
   *
   * @var string
   */
  private $size;



  public function __construct(string $size = '12MB')
  {
    $this->size = $size;
  }


  /**
   * Rotate the logs
   *
   * @param string $path
   * @return void
   */
  public function rotate(?string $path) : void
  {
    if ($path) {
      $rotate = new Rotate($path);
      $rotate->size($this->size);
      $rotate->run();
    }
  }
}