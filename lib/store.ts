// lib/store.ts
export const getHiringStatus = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('hiringStatus') === 'open';
  }
  return true;
};

export const setHiringStatus = (status: boolean) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('hiringStatus', status ? 'open' : 'closed');
  }
};