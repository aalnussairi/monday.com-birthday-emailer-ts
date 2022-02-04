import { Request, Response } from 'express';
import {
  getItemName,
  getRecipientAge,
  getRecipientEmail,
} from '../services/mondayService';
import { sendEmail } from '../services/sendgridService';

export const executeAction = async (req: Request, res: Response) => {
  const { shortLivedToken } = req.session;
  const { itemId, email, birthdate } = req.body.payload.inboundFieldValues;
  try {
    const recipientName = await getItemName(shortLivedToken, itemId);
    const recipientEmail = await getRecipientEmail(
      shortLivedToken,
      itemId,
      email
    );
    const recipientAge = await getRecipientAge(
      shortLivedToken,
      itemId,
      birthdate
    );

    sendEmail(recipientEmail, recipientName, recipientAge);

    return res.status(200).send({});
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
};
