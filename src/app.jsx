import React from 'react';
import DemoPage from './DemoPage';
import '../styles/index.scss';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>App</h1>
				<DemoPage/>
      </div>
    )
  }
}
