import React, { Component } from 'react';
import ScreenPickerComponent from './ScreenPickerComponent'
// import { connect } from 'react-redux';
// import { appAuthKey } from '../redux/actions/appAuth';

class ScreenPicker extends Component {

  constructor(props) {
    super(props);
    let url = new URL(window.location.href)
    this.getUrlTerms = this.getUrlTerms.bind(this);
    this.state = {
      screen: url.searchParams.get("screen"),
    }
  }
  componentDidMount () {
	  this.getUrlTerms()
  }
	  
  getUrlTerms() {
	 // this.props.appAuthKey(this.state.apiKey)
  }
  render() {
    return (
      <ScreenPickerComponent
        screen={this.state.screen}
      />
    );
  }
}

// const mapStateToProps = state => ({
// 	})

// const mapDispatchToProps = dispatch => ({
// 	  appAuthKey: (apikey) => dispatch(appAuthKey(apikey))
// 	})
  
  
export default /*connect(mapStateToProps, mapDispatchToProps)(*/ScreenPicker/*)*/;