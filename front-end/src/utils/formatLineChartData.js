export const getWeekDays = () => {
  const today = new Date();

  const days = [
    'Niedziela',
    'Poniedziałek',
    'Wtorek',
    'Środa',
    'Czwartek',
    'Piątek',
    'Sobota',
  ];

  const labels = [];
  for (let i = 0; i < 7; i++) {
    const pastDate = new Date(
      today.setDate(today.getDate() - (i === 0 ? 0 : 1))
    );
    labels.push(days[pastDate.getDay()]);
  }
  return labels.reverse();
};

export const formatData = (data) => {
  const today = new Date();
  const expanses = [];

  for (let i = 0; i < 7; i++) {
    const pastDate = new Date(
      today.setDate(today.getDate() - (i === 0 ? 0 : 1))
    );

    //* Format data
    const day = pastDate.getDate().toString().padStart(2, '0');

    if (data[day]) {
      expanses.push(+data[day][0].spendings);
    } else expanses.push(0);
  }

  return expanses.reverse();
};
