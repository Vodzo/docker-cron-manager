<?php

namespace App\Service;

interface RunnerInterface {

  public function getOutput();

  public function run(int $jobId): self;
}