export function deleteHeader(accessToken){
  return {
    headers: {
      'X-Cybozu-Authorization': accessToken,
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }
  }
}