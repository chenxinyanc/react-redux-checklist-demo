import * as React from 'react';
import { CheckListItemState, CheckListState } from '../state/types';
import { List, FocusZone } from 'office-ui-fabric-react';
import { connect, MapDispatchToProps } from 'react-redux';
import { CheckListItem } from '../components/CheckListItem';
import { CheckListAction, editItem } from '../state/actions';
import { Dispatch } from 'redux';

export interface CheckListOwnProps {

}

interface CheckListStateProps {
    items: CheckListItemState[];
}

interface CheckListDispatchProps {
    onEditItem: (change: Readonly<Partial<CheckListItemState> & Pick<CheckListItemState, 'id'>>) => void;
}


function mapStateToProps(state: CheckListState): CheckListStateProps {
    return { items: state.items };
}

function mapDispatchToProps(dispatch: Dispatch<CheckListAction>): CheckListDispatchProps {
    return {
        onEditItem(change) { dispatch(editItem(change)); }
    }
}

export class CheckListBase extends React.PureComponent<CheckListOwnProps & CheckListStateProps & CheckListDispatchProps> {
    private _onRenderItem = (item?: CheckListItemState, index?: number): React.ReactNode => {
        if (!item) {
            return null;
        }
        return <CheckListItem key={index} item={item} onAcceptChanges={this.props.onEditItem} />
    }

    public render() {
        return (<FocusZone>
            <List<CheckListItemState> items={this.props.items} onRenderCell={this._onRenderItem} />
        </FocusZone>);
    }
}

export const CheckList = connect(mapStateToProps, mapDispatchToProps)(CheckListBase);
