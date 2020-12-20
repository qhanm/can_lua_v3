import React from 'react';
import HomeStack from "./stacks/HomeStack";
import {SessionProvider} from "./context/SessionProvider";

class App extends React.Component
{
    render() {
        return (
            <SessionProvider>
                <HomeStack />
            </SessionProvider>
        )
    }
}

export default App;
