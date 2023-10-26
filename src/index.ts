import app from './app';

const main = (): void => {
    app.listen(app.get("port"));
    console.info(`Server on port ${app.get("port")}`);
}

main();