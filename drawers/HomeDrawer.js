import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SideBarCustom from "../components/layout/SideBarCustom";
import HomeScreen from "../screens/HomeScreen";
import {BackHandler} from "react-native";
import {getAllSettings, insertSettingDefault} from "../databases/Setup";

const Drawer = createDrawerNavigator();

class HomeDrawer extends React.Component
{
    constructor(props) {
        super(props);

        // this.props.navigation.addListener(
        //     'focus',
        //     payload => {
        //         if(this.props.route !== undefined && this.props.route.params !== undefined){
        //             const { isLoading } = this.props.route.params;
        //             console.log(isLoading);
        //             this.setState({ isLoading: (isLoading === undefined ? false : isLoading ) })
        //         }
        //     }
        // );
        this.state = {
            settings: []
        }

    }

    componentDidMount() {
        this.loadSetting();

        // if(this.state.settings.length === 0){
        //     insertSettingDefault().then(() => {}).catch((error) => console.log(error))
        //     this.loadSetting();
        // }
    }

    loadSetting = () => {
        getAllSettings().then((settings) => {
            this.setState(settings);
        }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        console.log(this.state.settings)
        return (
            <Drawer.Navigator drawerContent={ props =>  <SideBarCustom {...props} /> } >
                <Drawer.Screen
                    name="HomeScreen"
                    navigation={ this.props.navigation }
                    component={HomeScreen}
                />
            </Drawer.Navigator>
        )
    }
}

export default HomeDrawer;
