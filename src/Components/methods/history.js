// const changeListeners = [];

// function push(pathname) {
//   window.history.pushState({}, '', pathname);

//   changeListeners.forEach( cb => cb(pathname));
// }

// export default {
//     push, 
//     onChange: cb => changeListeners.push(cb)
// }

import createHistory from 'history/createBrowserHistory'


const history = createHistory();
const location = history.location

export default {history,location}