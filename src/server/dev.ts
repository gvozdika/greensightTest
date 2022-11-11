import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import config from '../../webpack.config';
import middlewares from './middlewares';
import listen from './listen';

const app = express();
middlewares(app);
const clientConfig = config({ isClient: true });
const serverConfig = config({ isClient: false });

const compiler = webpack([clientConfig, serverConfig]);
const clientCompiler = compiler.compilers[0];
const { publicPath } = clientConfig.output;
const { stats } = clientConfig;

const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath,
    stats,
    writeToDisk: filePath => /^(?!.*(hot)).*/.test(filePath),
});

const hotMiddleware = webpackHotMiddleware(clientCompiler);

const hotServerMiddleware = webpackHotServerMiddleware(compiler, {
    chunkName: 'server',
});

app.use(devMiddleware);
app.use(hotMiddleware);
app.use(hotServerMiddleware);

devMiddleware.waitUntilValid(() => listen(app));
