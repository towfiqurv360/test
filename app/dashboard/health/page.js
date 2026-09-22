export const metadata = { title: "Student Safety — Genesis Vidyapeeth" };

const features = [
{ tag: 'EMERGENCY', title: 'Emergency contacts', description: 'Guardian and emergency contact records.', implementation: 'Restricted profile fields.' },
{ tag: 'INCIDENT', title: 'Incident log', description: 'Safeguarding/incident records.', implementation: 'Highly restricted table.' },
{ tag: 'CONSENT', title: 'Consent', description: 'Required parent permissions.', implementation: 'Consent records.' },
{ tag: 'AUDIT', title: 'Access audit', description: 'Track sensitive-record access.', implementation: 'Immutable audit events.' }
];

export default function Page() {
  return (
    <div className="dashboard-content">
      <div className="page-title">
        <div>
          <span className="eyebrow">SAFETY</span>
          <h1>Student Safety</h1>
          <p>Restricted emergency and safeguarding records.</p>
        </div>
        <button className="button button-primary">Add / Configure</button>
      </div>

      <div className="module-grid">
        {features.map((item) => (
          <article className="module-card" key={item.title}>
            <span>{item.tag}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <button>Build feature →</button>
          </article>
        ))}
      </div>

      <section className="surface-card" style={{marginTop:18}}>
        <div className="section-head">
          <div><span className="eyebrow">IMPLEMENTATION NOTES</span><h2>What this page will contain</h2></div>
        </div>
        <div className="requirement-list">
          {features.map((item) => (
            <div key={item.title}>
              <b>{item.title}</b>
              <span>{item.implementation}</span>
              <small>Planned</small>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
