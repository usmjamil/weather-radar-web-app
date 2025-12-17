export const getReflectivityColor = (dbz: number): string => {
  if (dbz < 5) return 'transparent';
  if (dbz < 10) return '#90EE90';
  if (dbz < 15) return '#00FF00';
  if (dbz < 20) return '#00CD00';
  if (dbz < 25) return '#009900';
  if (dbz < 30) return '#FFFF00';
  if (dbz < 35) return '#FFD700';
  if (dbz < 40) return '#FFA500';
  if (dbz < 45) return '#FF8C00';
  if (dbz < 50) return '#FF4500';
  if (dbz < 55) return '#FF0000';
  if (dbz < 60) return '#DC143C';
  if (dbz < 65) return '#8B0000';
  return '#4B0000';
};

export const legendItems = [
  { color: '#90EE90', label: '5-10' },
  { color: '#00FF00', label: '10-15' },
  { color: '#FFFF00', label: '30-35' },
  { color: '#FFA500', label: '40-45' },
  { color: '#FF0000', label: '50-55' },
  { color: '#8B0000', label: '60+' }
];
