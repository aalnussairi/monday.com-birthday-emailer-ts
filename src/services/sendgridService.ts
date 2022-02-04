import sendGrid from '@sendgrid/mail';

export const sendEmail = async (to: string, name: string, age: string) => {
  try {
    if (typeof process.env.SENDGRID_API_KEY !== 'string')
      throw new Error('Please provide the API KEY for Sendgrid');
    if (typeof process.env.SENDGRID_FROM !== 'string')
      throw new Error('Please provide the email you will send from');
    sendGrid.setApiKey(process.env.SENDGRID_API_KEY);
    const email = {
      to,
      from: process.env.SENDGRID_FROM,
      subject: `Happy ${age} birthday ${name}`,
      text: `I hope you have a great birthday! -${process.env.MY_NAME}`,
    };
    await sendGrid.send(email);
  } catch (error) {
    console.error(error);
    return error;
  }
};
