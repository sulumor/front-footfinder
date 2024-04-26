/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
  
import { clearError } from '../../redux/Redux-actions/error';
  
class ErrorHandler extends React.Component<Readonly<any>>{
    static propTypes: { error: PropTypes.Requireable<object>; clearError: PropTypes.Requireable<(...args: any[]) => any>; };
    constructor(props : any){
        super(props);
  
        this.state = {
            showError: false
        };
    }
  
    componentDidUpdate(prevProps : any) {
        // Check error message.
        if(this.props.error.response.data.hasOwnProperty('error') &&
        (!prevProps.error.hasOwnProperty('message') || this.props.error.date !== prevProps.error.date)) {
            this.setState({showError: true});
        }
    }
  
    handleClick = () => {
        this.props.clearError();
        this.setState({showError: false});
    }
  
    // render() {
        // return this.state.showError && alert(`Attention : ${this.props.error.response.data.error}`)
    // }
}
  
ErrorHandler.propTypes = {
    error: PropTypes.object,
    clearError: PropTypes.func
}
  
const mapStateToProps = (state: { error: any; }) => ({
    error: state.error
});
  
const mapDispatchToProps = (dispatch: (arg0: { type: string; }) => void) => {
    return {
        clearError: () => { dispatch(clearError()); }
    };
};
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ErrorHandler);