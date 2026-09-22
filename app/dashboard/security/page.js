export const metadata = { title: "Security & Audit — Genesis Vidyapeeth" };

const features = [
{ tag: 'RBAC', title: 'Role-based access', description: 'Restrict every protected action.', implementation: 'Server-side authorization.' },
{ tag: 'AUTH', title: 'Authentication', description: 'Secure login and recovery.', implementation: 'Supabase Auth.' },
{ tag: '2FA', title: 'Two-factor hook', description: 'Optional stronger authentication.', implementation: 'Provider/auth configuration.' },
{ tag: 'AUDIT', title: 'Audit logs', description: 'Who did what and when.', implementation: 'Immutable event records.' }
];

export default function Page() {
  return (
    <div className="dashboard-content">
      <div className="page-title">
        <div>
          <span className="eyebrow">SECURITY</span>
          <h1>Security & Audit</h1>
          <p>Security controls for a child-focused platform.</p>
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
