require('dotenv').config();

const userInfo = {
  action: process.env.REQUEST,
  start: process.env.START,
  end: process.env.END,
  accessToken: process.env.GAROON_API_TOKEN,
  garoonUserId: process.env.GAROON_USER_ID,
  domain: process.env.DOMAIN,
  cybozu: process.env.CYBOZU
}
console.log("userInfo >",userInfo)

if(userInfo.cybozu == "Garoon"){
  if(userInfo.action == "Get"){

  } else if(userInfo.action == "Delete") {
    deleteGaroonEvents(userInfo);
  } else if(userInfo.action == "DeleteEvents"){
    deleteGaroonRepeatEvents(userInfo);
  }
} else if(userInfo.cybozu == "Kintone") {

}