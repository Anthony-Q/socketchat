export default (body, title) => {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>${title}</title>
     <style type="text/css">
      
     </style>
    </head>
    <body>
      <div id="root">
      ${body}
      
      </div>
      <div id="portal"></div>
      <div id="chatPortal"></div>
    <script type="text/javascript" src="index.bundle.js"></script></body>
  </html>
  `
}