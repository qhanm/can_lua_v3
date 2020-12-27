import React from 'react';
import {useToast, ToastContext} from "react-native-styled-toast";
import {Button} from "react-native-elements";
import {Text, TouchableOpacity} from "react-native";

function CusToast(props) {
    return (
        <ToastContext.Consumer>
            {({ toast }) => {
                return toast({
                    message: 'My First Toast!',
                    toastStyles: {
                        bg: '#2288dd',
                        borderRadius: 4
                    },
                    color: 'white',
                    iconColor: 'white',
                    iconFamily: 'FontAwesome',
                    iconName: 'info',
                    closeButtonStyles: {
                        px: 4,
                        bg: 'darkgrey',
                        borderRadius: 4
                    },
                    closeIconFamily: 'FontAwesome',
                    closeIconName: 'close',
                    closeIconColor: 'white',
                    hideAccent: true
                })
            }}
        </ToastContext.Consumer>
    )
}

export default CusToast;
