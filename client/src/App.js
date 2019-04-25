import React, { Component } from 'react';
import './App.css';
import Axios from 'axios';
// import { ActionCableConsumer, ActionCableProvider } from 'react-actioncable-provider';
import Cable from 'actioncable';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { order: null };
  }

  async componentDidMount() {
    this.cable = Cable.createConsumer('ws://localhost:3001/cable');
    const data = await Axios.get('http://localhost:3001/orders/1');
    this.setState({ order: data.data });
    this.cable.subscriptions.create({
      channel: 'OrderStatusChangesChannel'
    }, {
      connected: () => {
        console.log('Connected succesfully!');
      },
      received: this.handleOrderStatusChanged
    });
  }

  handleOrderStatusChanged = (data) => {
    const newState = { order: { ...this.state.order, status: data.status } };
    console.log(`Status was update to ${data.status}`);
    this.setState(newState);
  }

  render() {
    const { order } = this.state;
    return (
        <div className="App">
          {order && <div className="order-wrapper">
            id: {order.id}
            <br/>
            status: {order.status}
            <br/>
            name: {order.user.first_name}
            <br/>
            {order.order_items.map(orderItem => (
              <div key={orderItem.name}>{orderItem.quantity}x {orderItem.name}</div>
            ))}
          </div>}
          {!order && "No order found."}
        </div>
    );
  }
}

export default App;
