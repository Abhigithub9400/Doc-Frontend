interface ConfirmationContent {
  [key: string]: Record<string, string>;
}
export const confirmationContent: ConfirmationContent = {
  information: {
    icon: 'info-circle',
    title: 'Information',
    content:
      "A new password will be generated and sent to the employee's email address.",
  },
  error: {
    icon: 'forbidden-circle',
    title: 'Error',
    content: 'Are you sure you want to continue ',
  },
  warning: {
    icon: 'danger-triangle',
    title: 'Warning',
    content: 'Are you sure you want to continue ',
  },
  success: {
    icon: 'greenTick',
    title: 'Success',
    content: 'Are you sure you want to continue ',
  },
  delete: {
    icon: 'trash-bin',
    title: 'Delete',
    content: 'Are you sure you want to delete ?',
  },
  logout: {
    icon: 'logout-red',
    title: 'Logout',
    content: 'Are you sure you want to log out of the application?',
  },
};
