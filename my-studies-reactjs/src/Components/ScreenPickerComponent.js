import React, { Component } from 'react';
import NoPageFound from './Common/NoPageFound'
import Test from './Common/Test'
import ContactData from '../Components/UI/ContactData'

class ScreenPickerComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            screen: this.props.screen
        }
        this.ShowView = this.ShowView.bind(this);
    }

    ShowView = (view) => {
        switch (view) {
            case "Test":
                return <Test />
            case "UI":
                return <ContactData />
            default:
                return <NoPageFound />
        }
    }

    render() {
        let view = this.state.screen
        return (
            <div className="main-container">
                {this.ShowView(view)}
            </div>
        );
    }
}

export default ScreenPickerComponent;