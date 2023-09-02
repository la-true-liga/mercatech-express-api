import app from './app';

const main = (): void => {
    app.listen(app.get("port"));
    console.log(`Server on port ${app.get("port")}`);
}

main();