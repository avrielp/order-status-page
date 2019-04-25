import React, { Component } from 'react';
import './App.scss';
import Axios from 'axios';
// import { ActionCableConsumer, ActionCableProvider } from 'react-actioncable-provider';
import Cable from 'actioncable';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { order: null, loading: false };
  }

  getIdOfOrder() {
    var str = window.location.href;
    if (str[str.length-1] === '/') { str = str.substr(0, str.length - 1)}
    return str.substring(str.lastIndexOf('/') + 1);
  }

  async componentDidMount() {
    this.cable = Cable.createConsumer('ws://localhost:3001/cable');

    this.cable.subscriptions.create({
      channel: 'OrderStatusChangesChannel'
    }, { 
      received: this.handleOrderStatusChanged
    });
    try {
      this.setState({ loading: true });
      const data = await Axios.get(`http://localhost:3001/orders/${this.getIdOfOrder()}`);
      this.setState({ order: data.data, loading: false });
    }
    catch(e) {
      console.log(e);
      this.setState({ loading: false });
    }

  }

  handleOrderStatusChanged = (data) => {
    const { id, status } = data;
    if (id === this.state.order.id) {
      const newState = { order: { ...this.state.order, status: data.status } };
      this.setState(newState);
    }
    console.log(`Status was update to ${status}`);
  }

  titleize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    const { order, loading } = this.state;
    console.log(order);
    return (
        <div className="App">
          <div className="order-wrapper">
              {loading && "Loading..."}
              {!loading && !order && "No order found."}
              {order && order.id && <>
                <div className="row border-bottom">
                  <div className="col-md-6">
                    <h3 className="order-title text-info">Order ID</h3>
                    <span>{order.id}</span>
                  </div>
                  <div className="col-md-6">
                    <a className="view-order-link float-right" href="#view">View my order</a>
                  </div>
                </div>
                <div className="row border-bottom">
                  <div className="col-md-12">
                    <h3 className="order-title text-info">Items ordered</h3>
                    {order.order_items.map(orderItem => (
                      <div className="text-secondary" key={orderItem.name}>{orderItem.quantity}x {orderItem.name}</div>
                    ))}
                  </div>
                </div>
                <div className="row border-bottom">
                  <div className="col-md-12">
                    <h3 className="order-title text-info">Name, Surname</h3>
                    <span className="text-secondary">{ `${order.user.first_name} ${order.user.last_name}` }</span>
                  </div>
                </div>
                <div className="row border-bottom">
                  <div className="col-md-6">
                    <h3 className="order-title text-info">Company Address</h3>
                    <div className="text-secondary">{order.user.company_site}</div>
                    <div className="text-secondary">{order.user.company_address}</div>
                    <div className="text-secondary">{order.user.company_extra_details}</div>
                  </div>
                  <div className="col-md-6">
                    <img alt="logo" className="logo img-thumbnail float-right" src={order.user.logo_src} />
                  </div>
                </div>
                <div className="row border-bottom">
                  <div className="col-md-12">
                    <h3 className="order-title text-info">Pickup point</h3>
                    <div className="text-secondary">{order.pickup_point}</div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <h3 className="order-title text-info">Status</h3>
                    <div className="text-secondary">{this.titleize(order.status)}</div>
                  </div>
                </div>
              </>}
            </div>
        </div>
    );
  }
}

export default App;
