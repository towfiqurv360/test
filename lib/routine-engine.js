/**
 * Deterministic school timetable scheduler.
 *
 * AI is intentionally not the final scheduler.
 * This engine handles hard constraints and reports conflicts.
 */

export function generateVerifiedRoutine(input) {
  const days = input.days || [];
  const periods = input.periods || [];
  const requirements = input.requirements || [];
  const teachers = new Map((input.teachers || []).map(t => [t.id, t]));
  const rooms = input.rooms || [];
  const teacherBusy = new Set();
  const roomBusy = new Set();
  const classBusy = new Set();
  const schedule = [];
  const conflicts = [];

  // Sort the hardest requirements first so scarce resources are placed before flexible ones.
  const expanded = [];
  for (const req of requirements) {
    for (let i = 0; i < Number(req.periodsPerWeek || 0); i++) expanded.push(req);
  }
  expanded.sort((a,b) => (b.periodsPerWeek || 0) - (a.periodsPerWeek || 0));

  for (const req of expanded) {
    const teacher = teachers.get(req.teacherId);
    let placed = false;

    for (const day of days) {
      if (placed) break;
      for (const period of periods) {
        const key = `${day}|${period.id}`;
        const teacherKey = `${req.teacherId}|${key}`;
        const classKey = `${req.grade}|${key}`;
        const room = rooms.find(r => !(roomBusy.has(`${r.id}|${key}`)));
        const unavailable = teacher?.unavailable?.some(x => x.day === day && x.periodId === period.id);

        if (teacherBusy.has(teacherKey) || classBusy.has(classKey) || unavailable) continue;

        const roomId = room?.id || "virtual";
        const roomKey = `${roomId}|${key}`;
        if (roomBusy.has(roomKey)) continue;

        schedule.push({
          grade: req.grade,
          day,
          period: period.label,
          periodId: period.id,
          subject: req.subject,
          teacher: teacher?.name || "Unassigned",
          teacherId: req.teacherId,
          room: room?.name || "Unassigned"
        });
        teacherBusy.add(teacherKey);
        classBusy.add(classKey);
        roomBusy.add(roomKey);
        placed = true;
        break;
      }
    }

    if (!placed) conflicts.push({
      grade: req.grade,
      subject: req.subject,
      teacher: teacher?.name || "Unassigned",
      reason: "No valid slot satisfies the hard constraints."
    });
  }

  const expected = expanded.length;
  const actual = schedule.length;
  const teacherCollisions = countDuplicate(schedule, x => `${x.teacherId}|${x.day}|${x.periodId}`);
  const classCollisions = countDuplicate(schedule, x => `${x.grade}|${x.day}|${x.periodId}`);

  return {
    valid: conflicts.length === 0 && teacherCollisions === 0 && classCollisions === 0 && actual === expected,
    schedule,
    conflicts,
    metrics: {
      "Requested slots": expected,
      "Scheduled slots": actual,
      "Unresolved conflicts": conflicts.length,
      "Teacher collisions": teacherCollisions,
      "Class collisions": classCollisions
    },
    summary: conflicts.length === 0
      ? `All ${actual} requested teaching slots were placed without teacher or class collisions.`
      : `${conflicts.length} teaching requirement(s) could not be placed. Publishing should remain blocked.`
  };
}

function countDuplicate(items, keyFn) {
  const seen = new Set();
  let duplicates = 0;
  for (const item of items) {
    const key = keyFn(item);
    if (seen.has(key)) duplicates++;
    seen.add(key);
  }
  return duplicates;
}
