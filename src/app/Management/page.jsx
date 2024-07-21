import Management from "@/Components/About/Management";
import Committee from "@/Components/About/Committee";
import "./management.css";
import ComapnyProfileSidebar from "@/Components/About/ComapnyProfileSidebar";

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
    <div className="container">
      <div className="row py-5 justify-content-center">
        <div className="col-12 col-md-7">
          <div className="committee-section mb-4">
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
        <div className="col-12 col-md-3">
          <ComapnyProfileSidebar title="MANAGEMENT AND BOARD COMMITTEES" />
        </div>
      </div>
    </div>
  );
}

export default Manage;
