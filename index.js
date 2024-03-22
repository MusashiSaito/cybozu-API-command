import { config } from 'dotenv';
config();
import axios from 'axios';

function createRecord(index) {
  return {
    タイトル: { value: index.toString() },
    creater: { value: chobiitUserName },
    updater: { value: chobiitUserName },
    レコード作成日時: { value: "2023-09-20T10:00" },
    レコード更新日時: { value: "2023-09-21T10:30" },
    GroupSetting: { value: "saitom dev group" }
  };
}
  
  const records = [];
  for (let i = 101; i <= 101; i++) {
    records.push(createRecord(i));
  }

  axios({
    method: 'post',
    url: `https://${subdomain}/k/v1/records.json`,
    headers: {
      'X-Cybozu-API-Token': apiToken,
      'Content-Type': 'application/json',
    },
    data: {
      app: appId,
      records: records,
    },
  })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
