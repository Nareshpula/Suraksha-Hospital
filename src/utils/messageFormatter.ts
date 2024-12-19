interface AppointmentData {
  name: string;
  phone: string;
  date: string;
  doctor: string;
  comments?: string;
}

export const formatWhatsAppMessage = (data: AppointmentData): string => {
  const message = `
*New Appointment Request*
------------------------
*Patient Name:* ${data.name}
*Phone Number:* ${data.phone}
*Preferred Date:* ${new Date(data.date).toLocaleDateString('en-IN', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})}
*Doctor:* ${data.doctor}
${data.comments ? `\n*Additional Comments:* ${data.comments}` : ''}
------------------------
Sent via Bysani Suraksha Speciality Hospital Website
`.trim();

  return message;
};