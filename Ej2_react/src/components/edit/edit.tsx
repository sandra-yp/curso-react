import * as React from 'react';

interface Props {
  newTeamName : string;
  onSubmitNewTeamName : (newEditingTeamName : string) => void;
  onLoadMembers : () => void;
}

const onChange = (props : Props) => (event) => {
  props.onSubmitNewTeamName(event.target.value);
}

export const EditComponent = (props : Props) =>
  <>
    <input value={props.newTeamName}
            onChange={onChange(props)}/>
    <button onClick={props.onLoadMembers}>Load</button>
  </>