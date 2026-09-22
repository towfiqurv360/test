export const metadata = { title: "Settings — Genesis Vidyapeeth" };

const features = [
{ tag: 'APPEARANCE', title: 'Theme', description: 'Light/dark mode.', implementation: 'CSS variables + persisted preference.' },
{ tag: 'LANGUAGE', title: 'Language', description: 'Bangla/English foundation.', implementation: 'i18n layer later.' },
{ tag: 'NOTIFY', title: 'Notifications', description: 'Push/email/SMS preferences.', implementation: 'User notification settings.' },
{ tag: 'INTEGRATIONS', title: 'Integrations', description: 'AI, payment, SMS and storage.', implementation: 'Server environment variables.' }
];

export default function Page() {
  return (
    <div className="dashboard-content">
      <div className="page-title">
        <div>
          <span className="eyebrow">SYSTEM</span>
          <h1>Settings</h1>
          <p>Platform and account preferences.</p>
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
