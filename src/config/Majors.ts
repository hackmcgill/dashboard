const MajorsList = [
  'Accounting',
  'Computer Science',
  'Aerospace Engineering',
  'Architectural Engineering',
  'Biochemistry',
  'Biological Engineering',
  'Biomedical Engineering',
  'Computer Engineering',
  'Electrical Engineering',
  'Environmental Engineering',
  'Software Engineering',
  'Mechanical Engineering',
  'Mining And Mineral Engineering',
  'Nuclear Engineering',
  'Petroleum Engineering',
  'Chemical Engineering',
  'Engineering',
  'Pharmacology',
  'Physiology',
  'Economics',
  'Nursing',
  'Pure Science',
  'Mathematics',
  'Marketing',
  'Management And Business Systems',
  'Dentist',
  'Health Science',
  'Neuroscience',
  'Nutrition Sciences',
  'Biology',
  'Fine Arts',
  'Liberal Arts',
  'Food Science',
  'Environmental Science',
  'Actuarial Science',
  'Journalism',
  'Information Sciences',
  'General Education',
  'Special Needs Education',
  'Philosophy And Religious Studies',
  'History',
  'Military Technologies',
  'Law',
  'Criminology',
  'International Relations',
  'Sociology',
  'Political Science And Government',
  'Chemistry',
  'Physics',
  'Advertising And Public Relations',
  'Psychology',
];

export const Majors = MajorsList.map((v) => ({ label: v, value: v }));
export default Majors;
