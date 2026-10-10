export function summarizeRequests(requests) {
  const count = (status) => requests.filter((request) => request.status === status).length;
  return {
    total: requests.length,
    pending: count('pending'),
    inProgress: count('in-progress'),
    completed: count('completed'),
  };
}