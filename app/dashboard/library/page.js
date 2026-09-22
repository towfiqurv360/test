export const metadata = { title: "Digital Library — Genesis Vidyapeeth" };

const features = [
{ tag: 'ARCHIVE', title: 'Resource archive', description: 'Notes, sheets, PDFs and recordings.', implementation: 'Storage metadata.' },
{ tag: 'FILTER', title: 'Smart filters', description: 'Class, subject, chapter and type.', implementation: 'Search/filter API.' },
{ tag: 'ACCESS', title: 'Secure access', description: 'Only entitled users can download.', implementation: 'Signed URLs/RBAC.' },
{ tag: 'HISTORY', title: 'Resource usage', description: 'Track downloads/views if needed.', implementation: 'Usage events.' }
];

export default function Page() {
  return (
    <div className="dashboard-content">
      <div className="page-title">
        <div>
          <span className="eyebrow">RESOURCE CENTER</span>
          <h1>Digital Library</h1>
          <p>School-wide learning resource archive.</p>
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
