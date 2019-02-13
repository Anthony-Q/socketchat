import Server from "./index.js";
import { renderToString, renderToStaticMarkup } from 'react-dom/server'

// Server.get("/", (req, res) => {
//     const innerContent = renderToString(<App pathname={req.url}/>);
//     console.log('hello from server.get')
//     const html = renderToStaticMarkup(<Html innerContent={innerContent} />);

//     // res.send(`<!DOCTYPE html>${html}`);
//     res.send(`hello from server`);
// });


console.log(Server)
function compareURI(path, uri) {
    const keys = [];
    const pattern = toRegex(path, keys);
    const match = pattern.exec(uri);
    if (!match) return null;
    const params = Object.create(null);
    for (let i = 1; i < match.length; i++) {
        params[key[i - 1].name] = 
          match[i] !== undefined ? match[i] : undefined;
    }
    return params;
}

async function resolve(routes, context) {
    for (const route of routes ) {
        const uri = context.error ? '/error' : context.pathname;
        const params = matchURI(route.path, uri);
        if (!params) continue;
        const result = await route.action({...context, params});
        if (result) return result;
    }
    const error = new Error('Not Found');
    error.status = 404;
    throw error;
}

export default {resolve};