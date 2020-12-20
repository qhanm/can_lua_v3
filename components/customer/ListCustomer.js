import React from 'react';
import {ScrollView, View, SafeAreaView} from "react-native";
import CustomerComponent from "./CustomerComponent";
import {getCustomerByClient} from "../../databases/Setup";
import {SessionContext} from "../../context/SessionProvider";

class ListCustomer extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            customers: []
        }
        //console.log(this.props.client_id);
    }

    componentDidMount() : void {
        this.loadCustomer(this.props.client_id);
    }

    loadCustomer = (client_id) => {
        getCustomerByClient(client_id).then((customers) => {
            this.setState({ customers });
        }).catch((error) => {
            console.log(error);
        })
    }

    __renderCustomer = () => {
        let { customers } = this.state;
        let arrCustomer = [];
        customers.map((customer, key) => {
            arrCustomer.push(
                <CustomerComponent
                    navigation={this.props.navigation}
                    customer={customer} key={key}
                    clientId={this.props.client_id}
                />
            )
        })

        return arrCustomer;
    }
    render() {
        return (
            <SessionContext.Consumer>
                {
                    sessionContext => (
                        <SafeAreaView>
                            <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
                                {
                                    this.__renderCustomer()
                                }
                            </ScrollView>
                        </SafeAreaView>
                    )
                }
            </SessionContext.Consumer>
        )
    }
}

export default ListCustomer;
