export default function(role: string) {
  let userRole: string;

  switch (role) {
    case 'employee':
      userRole = 'employee';
      break;
    case 'user':
      userRole = 'user';
      break;
    case 'guest':
    default:
      userRole = 'guest'
  }

  return userRole;
}