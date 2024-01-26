const axios = require('axios');

const start = 1
const end = 2
export function addRecords(){
  const records = [];
  for (let start = 101; end <= 101; i++) {
    records.push(createParams(start));
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
}

function createParams(index) {
  return {
    タイトル: { value: index.toString() },
    creater: { value: chobiitUserName },
    updater: { value: chobiitUserName },
    レコード作成日時: { value: "2023-09-20T10:00" },
    レコード更新日時: { value: "2023-09-21T10:30" },
    GroupSetting: { value: "saitom dev group" }
  };
}