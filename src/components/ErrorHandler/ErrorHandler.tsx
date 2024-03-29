/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Text } from '@chakra-ui/react'
  
import { clearError } from '../store/actions/error';
  
class ErrorHandler extends React.Component{
    constructor(props){
        super(props);
  
        this.state = {
            showError: false
        };
    }
  
    componentDidUpdate(prevProps) {
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
  
    render() {
        return this.state.showError && <Box zIndex="docked" pos="absolute" left="10px">
            <Text color="red" fontSize="xl" textAlign='center'>Attention : {this.props.error.response.data.error}</Text>
            <button onClick={this.handleClick} />
        </Box>
    }
}
  
ErrorHandler.propTypes = {
    error: PropTypes.object,
    clearError: PropTypes.func
}
  
const mapStateToProps = state => ({
    error: state.error
});
  
const mapDispatchToProps = dispatch => {
    return {
        clearError: () => { dispatch(clearError()); }
    };
};
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ErrorHandler);