import classNames from 'classnames';
import moment from 'moment';
import { CommandBarButton, DatePicker, Stack, TextField } from 'office-ui-fabric-react';
import * as React from 'react';
import { CheckListItemState } from '../state/types';
import classes from './CheckListItem.scss';

export interface CheckListItemProps {
    item: CheckListItemState;
    onAcceptChanges: (change: Readonly<Partial<CheckListItemState> & Pick<CheckListItemState, 'id'>>) => void;
    viewOperationArea?: React.ReactNode;
}

export const CheckListItem: React.FC<CheckListItemProps> = (props) => {
    const { item } = props;
    const [isEditing, setIsEditing] = React.useState(false);
    const [edits, setEdits] = React.useState<Partial<CheckListItemState>>({});
    return (<Stack
        key={item.id}
        className={classNames(classes.checkListItem, item.isDone && classes.done)}
        horizontal data-is-focusable>
        {
            isEditing
                ? (
                    <React.Fragment>
                        <Stack.Item grow>
                            <TextField
                                value={edits.title ?? item.title}
                                onChange={(e, n) => setEdits({ ...edits, title: n })}
                                label='Title'
                            />
                        </Stack.Item>
                        <DatePicker
                            label='Due'
                            value={edits.due ?? item.due}
                            onSelectDate={(d) => d && setEdits({ ...edits, due: d })}
                        />
                        <CommandBarButton
                            iconProps={{ iconName: 'CheckMark' }}
                            disabled={Object.keys(edits).length === 0}
                            onClick={() => {
                                props.onAcceptChanges({ ...edits, id: item.id });
                                setIsEditing(false);
                            }} />
                        <CommandBarButton iconProps={{ iconName: 'Cancel' }} onClick={() => setIsEditing(false)} />
                    </React.Fragment>
                )
                : (<React.Fragment>
                    <Stack grow>
                        <div className={classes.title}>{item.title}</div>
                        <div className={classNames(classes.due, item.due == null && classes.noDue)}>{item.due == null ? 'No due' : moment(item.due).format()}</div>
                    </Stack>
                    {props.viewOperationArea}
                    <CommandBarButton iconProps={{ iconName: 'Edit' }} onClick={() => setIsEditing(true)} />
                </React.Fragment>
                )
        }
    </Stack>);
};
CheckListItem.displayName = 'CheckListItem';
