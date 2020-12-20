import React, { Component } from 'react';
import {PageConstant} from "../utils/Constant";

export const SessionContext = React.createContext();

export class SessionProvider extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            isLoadingClient: false,
            clientGroupCurrent: '',
            isLoadingCustomer: false,
        }
    }

    setIsLoadingCustomer = (isLoadingCustomer) => {
        this.setState({ isLoadingCustomer });
    }

    setIsLoadingClient = (isLoadingClient) => {
        this.setState({ isLoadingClient });
    }

    setClientGroupCurrent = (clientGroupCurrent) => {
        this.setState({ clientGroupCurrent });
    }

    render() {
        return (
            <SessionContext.Provider value={{
                isLoadingClient: this.state.isLoadingClient,
                clientGroupCurrent: this.state.clientGroupCurrent,
                setIsLoadingClient: this.setIsLoadingClient,
                setClientGroupCurrent: this.setClientGroupCurrent,
                isLoadingCustomer: this.state.isLoadingCustomer,
            }}>
                { this.props.children }
            </SessionContext.Provider>
        )
    }
}
