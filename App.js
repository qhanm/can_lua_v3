import React from 'react';
import HomeStack from "./stacks/HomeStack";
import {SessionProvider} from "./context/SessionProvider";
import { ThemeProvider } from 'styled-components';
import { ToastProvider } from 'react-native-styled-toast';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    SafeAreaView,
    ToastAndroid,
    RefreshControl
} from 'react-native';

import CusToast from "./components/layout/CusToast";

class App extends React.Component
{
    render() {
        return (
            <ThemeProvider theme={{
                space: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48],
                colors: {
                    text: '#0A0A0A',
                    background: '#FFF',
                    border: '#E2E8F0',
                    muted: '#F0F1F3',
                    success: '#7DBE31',
                    error: '#FC0021',
                    info: '#00FFFF'
                }
            }}>
                <ToastProvider position="BOTTOM">
                    <SessionProvider>
                        <HomeStack />
                        {/*<CusToast />*/}
                    </SessionProvider>
                </ToastProvider>
            </ThemeProvider>

        )
    }
}

export default App;
