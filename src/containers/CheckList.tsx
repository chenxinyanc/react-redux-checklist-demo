import * as React from 'react';
import { CheckListItemState, CheckListState } from '../state/types';
import { List, FocusZone } from 'office-ui-fabric-react';
import { connect } from 'react-redux';
import classes from './CheckList.scss';
import moment = require('moment');

export interface CheckListOwnProps {

}

interface CheckListStateProps {
    items: CheckListItemState[];
}

function mapStateToProps(state: CheckListState): CheckListStateProps {
    return { items: state.items };
}

function onRenderItem(item?: CheckListItemState, index?: number): React.ReactNode {
    if (!item) {
        return null;
    }
    return (<div className={classes.checkListItem} key={item.id} data-is-focusable>
        <div className={classes.title}>{item.title}</div>
        <div className={classes.due}>{item.due == null ? 'No due' : moment(item.due).format()}</div>
    </div>);
}

export class CheckListBase extends React.PureComponent<CheckListOwnProps & CheckListStateProps> {
    public render() {
        return (<FocusZone>
            <List<CheckListItemState> items={this.props.items} onRenderCell={onRenderItem} />
        </FocusZone>);
    }
}

export const CheckList = connect(mapStateToProps)(CheckListBase);
