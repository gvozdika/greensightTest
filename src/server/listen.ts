import { Express } from 'express';
import chalk from 'chalk';
import ip from 'ip';
import Table from 'cli-table3';
import boxen from 'boxen';

const port = Number(process.env.PORT) || 3000;

export default (app: Express) => {
    app.listen(port, '0.0.0.0', () => {
        const serveMessage = new Table({
            chars: {
                top: '',
                'top-mid': '',
                'top-left': '',
                'top-right': '',
                bottom: '',
                'bottom-mid': '',
                'bottom-left': '',
                'bottom-right': '',
                left: '',
                'left-mid': '',
                mid: '',
                'mid-mid': '',
                right: '',
                'right-mid': '',
                middle: '',
            },
        });

        serveMessage.push(
            [chalk.green(`RWBP is up and running in ${chalk.blue(process.env.NODE_ENV)} mode!\n`)],
            [chalk.blue(`Local: ${chalk.underline(`http://localhost:${port}`)}`)],
            [chalk.blue(`On your network: ${chalk.underline(`http://${ip.address()}:${port}`)}`)]
        );

        if (process.env.NODE_ENV === 'production') {
            serveMessage.push([
                chalk.blue(`Bundle analyzer: ${chalk.underline(`http://localhost:${port}/report.html`)}`),
            ]);
        }

        console.log(`${boxen(serveMessage.toString(), { borderColor: 'green' })}\n`);
    }).on('error', err => {
        console.error(chalk.red(err));
    });
};
