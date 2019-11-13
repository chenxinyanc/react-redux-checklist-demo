import * as React from 'react';
import { CheckListItemState, CheckListState } from '../state/types';
import { List, FocusZone, CommandBarButton, PrimaryButton } from 'office-ui-fabric-react';
import { connect, MapDispatchToProps } from 'react-redux';
import { CheckListItem } from '../components/CheckListItem';
import { CheckListAction, editItem, removeItem, addItem } from '../state/actions';
import { Dispatch } from 'redux';

export interface CheckListOwnProps {

}

interface CheckListStateProps {
    items: CheckListItemState[];
}

interface CheckListDispatchProps {
    onAddItem: () => void;
    onEditItem: (change: Readonly<Partial<CheckListItemState> & Pick<CheckListItemState, 'id'>>) => void;
    onRemoveItem: (itemId: string) => void;
}


function mapStateToProps(state: CheckListState): CheckListStateProps {
    return { items: state.items };
}

function mapDispatchToProps(dispatch: Dispatch<CheckListAction>): CheckListDispatchProps {
    return {
        onAddItem() { dispatch(addItem({ title: 'New item', isDone: false })); },
        onEditItem(change) { dispatch(editItem(change)); },
        onRemoveItem(change) { dispatch(removeItem(change)); }
    }
}

export class CheckListBase extends React.PureComponent<CheckListOwnProps & CheckListStateProps & CheckListDispatchProps> {
    private _onRenderItem = (item?: CheckListItemState, index?: number): React.ReactNode => {
        if (!item) {
            return null;
        }
        return <CheckListItem
            key={index}
            item={item}
            onAcceptChanges={this.props.onEditItem}
            viewOperationArea={
                <>
                    <CommandBarButton iconProps={{ iconName: 'Strikethrough' }} checked={item.isDone} onClick={() => {
                        this.props.onEditItem({ id: item.id, isDone: !item.isDone });
                    }} />
                    <CommandBarButton iconProps={{ iconName: 'Delete' }} onClick={() => {
                        this.props.onRemoveItem(item.id);
                    }} />
                </>
            }
        />
    }

    public render() {
        // return (<FocusZone>
        //     <List<CheckListItemState> items={this.props.items} onRenderCell={this._onRenderItem} />
        // </FocusZone>);
        return (<FocusZone>
            <PrimaryButton onClick={this.props.onAddItem}>Add new</PrimaryButton>
            {this.props.items.map(this._onRenderItem)}
        </FocusZone>);
    }
}

export const CheckList = connect(mapStateToProps, mapDispatchToProps)(CheckListBase);
