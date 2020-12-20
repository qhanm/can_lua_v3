import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, SafeAreaView, ToastAndroid  } from 'react-native';
import GroupClient from "./GroupClient";
import {DefaultStyle} from "../../utils/Constant";
import {getAllClientGroup} from "../../databases/Setup";
import {SessionContext} from "../../context/SessionProvider";

class ListClientComponent extends React.Component
{
    constructor(props){
        super(props);

        this.state = {
            heightScrollView: 10,
            clientGroup: [],
        }

    }
    componentDidMount(): void {

        getAllClientGroup().then((realm) => {
            this.setState({clientGroup: realm});
        }).catch((error) => {
            console.log(error);
        })
    }

    getHeightView = (event) => {
        let {x, y, width, height} = event.nativeEvent.layout;
        let heightWindow = Dimensions.get('window').height;

        if(height > heightWindow){
            height = height - heightWindow;
        }

        this.setState({heightScrollView: height});
    }

    __renderAlert = () => {
        ToastAndroid.showWithGravity('Thêm nhóm mới thành công',  ToastAndroid.LONG,ToastAndroid.BOTTOM)
    }

    __renderClientGroup = (sessionContext) => {
        return this.state.clientGroup.map((group, key) => {
            return (
                <View
                    style={[styles.row, DefaultStyle.Card]}
                    key={key}
                >
                    <GroupClient navigation={this.props.navigation} group={group}/>
                </View>
            )
        })
    }

    render() {
        return (
            <SessionContext.Consumer>
                {
                    sessionContext => (
                        <View>
                            <SafeAreaView>
                                <ScrollView contentContainerStyle={{paddingBottom: 200}}>
                                    <View style={styles.container} onLayout={(event) => { this.getHeightView(event) }}>
                                        {
                                            this.__renderClientGroup(sessionContext)
                                        }
                                    </View>
                                </ScrollView>
                            </SafeAreaView>
                        </View>
                    )
                }
            </SessionContext.Consumer>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    row: {
        width: '95%',
    }
});

export default ListClientComponent;
