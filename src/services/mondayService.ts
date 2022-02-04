import initMondayClient from 'monday-sdk-js';
import calcAge from '../utils/calcAge';

export const getRecipientEmail = async (
  token: string,
  itemId: number,
  emailColumnId: string
) => {
  const emailValue = await getColumnValue(token, itemId, emailColumnId);
  return emailValue.email;
};

export const getRecipientAge = async (
  token: string,
  itemId: number,
  birthdayColumnId: string
) => {
  const birthdateValue = await getColumnValue(token, itemId, birthdayColumnId);
  return calcAge(birthdateValue.date);
};

const getColumnValue = async (
  token: string,
  itemId: number,
  columnId: string
) => {
  try {
    const mondayClient = initMondayClient({ token });
    const query = ` query ($itemId: [Int], $columnId: [String]) {
      items (ids: $itemId) {
        column_values (ids: $columnId){
          value
        }
      }
    }
    `;

    const variables = { itemId, columnId };
    const columnValue = await mondayClient.api(query, { variables });
    return JSON.parse(columnValue.data.items[0].column_values[0].value);
  } catch (err) {}
};

export const getItemName = async (token: string, itemId: number) => {
  try {
    const mondayClient = initMondayClient({ token });
    const query = ` query ($itemId: [Int]){
      items (ids: $itemId) {
        name
      }
    }
    `;
    const variables = { itemId };
    const itemName = await mondayClient.api(query, { variables });
    return itemName.data.items[0].name;
  } catch (error) {}
};

// class MondayService {

//   static async getColumnValue(token: string, itemId: number, columnId: string) {
//     try {
//       const mondayClient = initMondayClient();
//       mondayClient.setToken(token);

//       const query = `query($itemId: [Int], $columnId: [String]) {
//         items (ids: $itemId) {
//           column_values(ids:$columnId) {
//             value
//           }
//         }
//       }`;
//       const variables = { columnId, itemId };

//       const response = await mondayClient.api(query, { variables });
//       return response.data.items[0].column_values[0].value;
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   static async changeColumnValue(
//     token: string,
//     boardId: number,
//     itemId: number,
//     columnId: string,
//     value: string
//   ) {
//     try {
//       const mondayClient = initMondayClient({ token });

//       const query = `mutation change_column_value($boardId: Int!, $itemId: Int!, $columnId: String!, $value: JSON!) {
//         change_column_value(board_id: $boardId, item_id: $itemId, column_id: $columnId, value: $value) {
//           id
//         }
//       }
//       `;
//       const variables = { boardId, columnId, itemId, value };

//       const response = await mondayClient.api(query, { variables });
//       return response;
//     } catch (err) {
//       console.log(err);
//     }
//   }
// }
