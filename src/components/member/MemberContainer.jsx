import { getUser } from "../auth/AuthService";
import Member from "./Member";

function MemberContainer({ members, onDelete, ownerId }) {
  const currentUser = getUser();

  return (
    <>
      {members.map((member) => (
        <Member
          key={member.id}
          id={member.id}
          name={member.name}
          email={member.email}
          onDelete={onDelete}
          currentUserId={currentUser?.id}
          ownerId={ownerId}
        />
      ))}
    </>
  );
}

export default MemberContainer;