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
  public function rotate(string $path) : void
  {
    $rotate = new Rotate($path);
    $rotate->size($this->size);
    $rotate->run();
  }
}