const useAuth = () => {
  const token = localStorage.getItem('accessToken');
  return !!token; // true nếu có token
};