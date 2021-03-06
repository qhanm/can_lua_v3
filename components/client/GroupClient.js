import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Color, DefaultStyle, Font, PageConstant} from "../../utils/Constant";
import { Icon } from 'react-native-elements'
import {sub} from "react-native-reanimated";
import {SessionContext} from "../../context/SessionProvider";
import {deleteClient, getClientByGroup} from "../../databases/Setup";
import Helpers from "../../utils/Helper";
import {ToastContext} from "react-native-styled-toast";

const styles = StyleSheet.create({
    container: {},
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 2,
        borderBottomWidth: 1,
        borderBottomColor: Color.Red,
    },
    textHeader: {
        fontFamily: Font,
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: 3,
    },
    headerBase: {
        color: Color.Blue
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 0,
        //height: 50,
        //justifyContent: 'space-around',
    },
    iconDelete: {
        backgroundColor: Color.Red,
        textAlign: 'left',
        padding: 5,
    },
    rowRightContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});

class GroupClient extends React.Component
{
    constructor(props){
        super(props);

        const { group } = this.props;

        this.state = {
            widthViewClientRight: 0,
            widthIconDelete: 0,
            clients: [],
        }
    }

    getHeightView = (event) => {
        let {x, y, width, height} = event.nativeEvent.layout;
        this.setState({widthViewClientRight: (width - this.state.widthIconDelete)});
    }

    getWidthIconDelete = (event) => {
        let {x, y, width, height} = event.nativeEvent.layout;
        this.setState({widthIconDelete: width});
    }

    __onPressClient = (sessionContext, navigation) => {
        navigation.navigate(PageConstant.CustomerScreen)
    }

    componentDidMount() {
        this.loadClient(this.props.group.date);
    }

    loadClient = (date) => {
        getClientByGroup(date).then((result) => {
            this.setState({ clients: result });
        }).catch((error) => {
            console.log(error);
        })
    }
    __renderClient = (sessionContext) => {
        if(sessionContext.isLoadingClient && sessionContext.clientGroupCurrent === this.props.group.date)
        {
            //console.log('call reload');
            //this.loadClient(this.props.group.date);
        }
        let { clients } = this.state;
        let clientArr = [];
        clients.map((cc, key) => {
            clientArr.push(
                <View
                    key={Helpers.Guid() + key}
                    style={[DefaultStyle.Card, styles.row]}
                    onLayout={(event) => {
                        this.getHeightView(event)
                    }}
                >
                    <View onLayout={(event) => { this.getWidthIconDelete(event) }}>
                        <TouchableOpacity
                            onPress={() => { console.log('on delete ') }}
                        >
                            <Icon name='delete' color={Color.White} style={styles.iconDelete}/>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => { this.__onPressClient(sessionContext, this.props.navigation) }}
                    >
                        <View
                            style={[styles.rowRightContent, {width: this.state.widthViewClientRight}]}
                        >
                            <Text style={{marginLeft: 10, fontFamily: Font, color: 'red'}}>{ cc.name }</Text>
                            <Text style={{marginRight: 8}}>
                                <Icon
                                    name='chevron-right'
                                    type='font-awesome'
                                    color={Color.Red}

                                    onPress={() => console.log('hello')} />
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        })

        return clientArr;
    }

    __handleDeleteClient = (toast, client_id) => {
        deleteClient(client_id).then((result) => {
            return toast(Helpers.ToastSuccess('Xóa thành công !'));
        }).catch((error) => {
            return toast(Helpers.ToastError(error.toString()));

        })
    }

    render() {
        const { date } = this.props.group;

        return (
            <SessionContext.Consumer>
                {
                    sessionContext =>
                       <ToastContext.Consumer>
                           {({ toast }) => {
                               return  <View style={styles.container}>
                                   <View style={styles.header}>
                                       <Icon name='today' color={Color.Blue}/>
                                       <Text style={[styles.textHeader, styles.headerBase]}>{ date }</Text>
                                   </View>
                                   <View>
                                       {
                                           this.state.clients.map((cc, key) => {
                                               return (
                                                   <View style={[DefaultStyle.Card, styles.row]} onLayout={(event) => {this.getHeightView(event)}} key={key}>
                                                       <View
                                                           onLayout={(event) => { this.getWidthIconDelete(event) }}
                                                       >
                                                           <TouchableOpacity
                                                               onPress={() => {
                                                                   Alert.alert(
                                                                       "Thông báo",
                                                                       `Bạn có chắc muốn xóa bảng tính "${ cc.name }" ?`,
                                                                       [
                                                                           {
                                                                               text: "Hủy",
                                                                               onPress: () => console.log("Cancel Pressed"),
                                                                               style: "cancel"
                                                                           },
                                                                           { text: "Xóa", onPress: () => this.__handleDeleteClient(toast, cc.id) }
                                                                       ],
                                                                       { cancelable: false }
                                                                   );
                                                               }}
                                                           >
                                                               <Icon
                                                                   name='delete'
                                                                   color={Color.White}
                                                                   style={styles.iconDelete}
                                                               />
                                                           </TouchableOpacity>
                                                       </View>
                                                       <TouchableOpacity
                                                       >
                                                           <View style={[styles.rowRightContent, {width: this.state.widthViewClientRight}]}>
                                                               <Text style={{marginLeft: 10, fontFamily: Font}}>{ cc.name }</Text>
                                                               <Text style={{marginRight: 8}}>
                                                                   <Icon
                                                                       name='chevron-right'
                                                                       type='font-awesome'
                                                                       color={Color.Red}
                                                                       onPress={() => this.props.navigation.navigate('CustomerScreen', { client_id: cc.id, client_name: cc.name })} />
                                                               </Text>
                                                           </View>
                                                       </TouchableOpacity>
                                                   </View>
                                               )
                                           })
                                       }
                                   </View>
                               </View>
                           }}
                       </ToastContext.Consumer>
                }
            </SessionContext.Consumer>
        )
    }
}


export default GroupClient;
