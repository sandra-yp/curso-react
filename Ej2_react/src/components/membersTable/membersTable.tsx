import * as React from 'react';
import { MemberEntity } from '../../model/member';
import { memberAPI } from '../../api/memberAPI';
import { MemberRow } from './memberRow';
import { MemberHead } from './memberHead';
import {} from 'core-js';
import { EditComponent } from '../edit';

interface Props {
}

// We define members as a state (the compoment holding this will be a container
// component)
interface State {
  members: Array<MemberEntity>,
  teamName : string
}

// Nice tsx guide: https://github.com/Microsoft/TypeScript/wiki/JSX
export class MembersTableComponent extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    // set initial state
    this.state = { members: [], teamName : "lemoncode" };
  }

  loadMembers = () => {
    memberAPI.getAllMembers(this.state.teamName).then((members) =>
      this.setState({ members: members })
    );
  }

  changeTeamName= (newEditingTeamName : string) => {
    this.setState({ teamName: newEditingTeamName })

  }

  public render() {

    return (
      <div className="row">
        <h2> Members Page</h2>

        <EditComponent
          newTeamName={this.state.teamName}
          onSubmitNewTeamName={this.changeTeamName}
          onLoadMembers={this.loadMembers}
        />

        <table className="table">
          <thead>
            <MemberHead />
          </thead>
          <tbody>
            {
              this.state.members.map((member: MemberEntity) =>
                <MemberRow key={member.id} member={member} />
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
}
