export const metadata = { title: "Calendar & Events — Genesis Vidyapeeth" };

const features = [
{ tag: 'EVENTS', title: 'Events', description: 'School programs, meetings and activities.', implementation: 'Calendar entity.' },
{ tag: 'EXAMS', title: 'Exam dates', description: 'Assessment schedule.', implementation: 'Exam calendar.' },
{ tag: 'HOLIDAYS', title: 'Holidays', description: 'School holiday calendar.', implementation: 'Holiday records.' },
{ tag: 'REMINDERS', title: 'Reminders', description: 'Push/SMS/email hooks.', implementation: 'Scheduled jobs.' }
];

export default function Page() {
  return (
    <div className="dashboard-content">
      <div className="page-title">
        <div>
          <span className="eyebrow">SCHOOL</span>
          <h1>Calendar & Events</h1>
          <p>One calendar for classes, exams, holidays and events.</p>
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
