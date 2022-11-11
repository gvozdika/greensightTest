let newrelic;
if (process.env.NEW_RELIC_LICENSE_KEY) {
    if (process.env.ENVIRONMENT === 'prod') {
        newrelic = require('newrelic');
    } else {
        console.warn('New Relic only available on production stage. Set ENVIRONMENT=prod environment variable');
    }
}
import express from 'express';
import { resolve } from 'path';
import axios from 'axios';
import middlewares from './middlewares';
import listen from './listen';

const app = express();
app.locals.newrelic = newrelic;
middlewares(app);

const publicPath = '/';
/* Путь задаётся относительно директории со сгенерированным tsc js-файлом */
const path = resolve(__dirname, '../');
app.use(publicPath, express.static(path));

const apiAxios = axios.create({
    baseURL: process.env.API_HOST,
});

app.get('/robots.txt', async (req, res) => {
    res.type('text/plain');
    try {
        const robotsTxtContent = await apiAxios('/robots');
        res.send(robotsTxtContent);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

app.get('/sitemap.xml', async (req, res) => {
    res.type('text/xml');
    try {
        const sitemapXmlContent = await apiAxios('/sitemap');
        res.send(sitemapXmlContent);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

const render = require(resolve(path, 'server')).default;
app.use(render());

listen(app);
