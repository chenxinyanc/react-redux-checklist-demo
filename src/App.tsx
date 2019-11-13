import { AzureCustomizationsLight } from '@uifabric/azure-themes';
import { Customizer } from 'office-ui-fabric-react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { CheckList } from './containers/CheckList';
import { store } from './state';

/**
 * React root component.
 * This is a function component.
 * @see https://reactjs.org/docs/components-and-props.html#function-and-class-components
 */
export const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Customizer {...AzureCustomizationsLight}>
                <h1>Check list</h1>
                <p>From App.tsx!</p>
                <CheckList />
            </Customizer>
        </Provider>);
};
App.displayName = 'App';
