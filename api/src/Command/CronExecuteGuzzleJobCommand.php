<?php

namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use App\Service\GuzzleService;

class CronExecuteGuzzleJobCommand extends Command
{
    protected static $defaultName = 'cron:execute-guzzle';

    /**
     * Guzzle Service
     *
     * @var GuzzleService
     */
    private $guzzleService;

    public function __construct(GuzzleService $guzzleService)
    {
        parent::__construct();
        $this->guzzleService = $guzzleService;
    }

    protected function configure()
    {
        $this
            ->setDescription('Add a short description for your command')
            ->addArgument('arg1', InputArgument::OPTIONAL, 'Argument description')
            ->addOption('option1', null, InputOption::VALUE_NONE, 'Option description')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $io = new SymfonyStyle($input, $output);
        $arg1 = $input->getArgument('arg1');

        if ($arg1) {
            $io->note($this->guzzleService->run($arg1));
        }

        // $io->success('Success');
    }
}
