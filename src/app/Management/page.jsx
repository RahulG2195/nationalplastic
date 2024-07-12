import Management from "@/Components/About/Management";
import Committee from "@/Components/About/Committee";
import "./management.css";

function Manage() {
  const auditCommitteeMembers = [
    "Mr. Purnachandra Rao Dendukuri, Non-Executive Independent Director, Chairman",
    "Mr. Bimal Parekh, Non-Executive Independent Director, Member",
    "Mr. Vipul Desai, Non-Executive Independent Director, Member",
    "Mrs. Ranganayaki Rangachari, Non Executive Independent Director, Member",
  ];

  const nominationCommitteeMembers = [
    "Mr. Vipul Desai, Non-Executive Independent Director, Chairman",
    "Mr. Purnachandra Rao Dendukuri, Non-Executive Independent Director, Member",
    "Mrs. Ranganayaki Rangachari, Non-Executive Independent Director, Member",
    "Mr. Bimal Parekh, Non-Executive Independent Director, Member",
  ];

  const stakeholdersCommitteeMembers = [
    "Mr. Purnachandra Rao Dendukuri, Non-Executive Independent Director, Chairman",
    "Mr. Bimal Parekh, Non-Executive Independent Director, Member",
    "Mr. Paresh Parekh, Managing Director, Member",
    "Mr. Ketan Parekh, Joint Managing Director, Member",
    "Mr. Vipul Desai, Non-Executive Independent Director, Member",
    "Mrs. Ranganayaki Rangachari, Non-Executive Independent Director, Member",
  ];

  return (
    <div>
      <div className="row p-5">
        <div className="col-md-8">
          <div className="committee-section">
            <h2>Committee</h2>
          </div>
          <Committee title="Audit Committee" members={auditCommitteeMembers} />
          <Committee
            title="Nomination and Remuneration Committee"
            members={nominationCommitteeMembers}
          />
          <Committee
            title="Stakeholders Relationship Committee"
            members={stakeholdersCommitteeMembers}
          />
          <Management />
        </div>
        <div className="col-md-4">
          <div className="company-profile-sidebar">
            <h3 className="sidebar-title"> Management and Board Committees</h3>
            <ul className="sidebar-list">
              <li className="sidebar-item">Company Profile</li>
              <li className="sidebar-item">Infrastructure</li>
              <li className="sidebar-item">Promoters/Directors</li>
              <li className="sidebar-item">Management and Board Committees</li>
              <li className="sidebar-item">Awards/Exports</li>
              <li className="sidebar-item">Introduction</li>
              <li className="sidebar-item">Terms & Conditions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Manage;
