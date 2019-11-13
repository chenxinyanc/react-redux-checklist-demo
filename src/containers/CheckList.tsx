import * as React from 'react';
import { CheckListItem, CheckListState } from '../state/types';
import { List, FocusZone } from 'office-ui-fabric-react';
import { connect } from 'react-redux';

export interface CheckListOwnProps {

}

interface CheckListStateProps {
    items: CheckListItem[];
}

function mapStateToProps(state: CheckListState): CheckListStateProps {
    return { items: state.items };
}

export class CheckListBase extends React.PureComponent<CheckListOwnProps & CheckListStateProps> {
    public render() {
        return (<FocusZone>
            <List<CheckListItem> items={this.props.items} />
        </FocusZone>);
    }
}

export const CheckList = connect(mapStateToProps)(CheckListBase);
