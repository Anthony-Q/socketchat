import React from 'react';
import ENDPOINTS from "./methods/endpoint.js";
import history from "./methods/history.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pathname: props.pathname
    }
  }


  componentDidMount() {
    // history.onChange( (pathname) => {
    //   this.setState( (prevState) => { 
    //     let newPath = prevState.pathname;
    //     return {pathname: newPath};
    //   });
    // });

    console.log('hello from component did mount')
  }
    render() {
      const HANDLER = ENDPOINTS[this.props.pathname];
  return (<div>
    <HANDLER />

  </div>

  )
  
    }
}

// App.propTypes = {
//   pathname: PropTypes.oneOf(Object.keys(PAGES)).isRequired,
// };