// sessionsのレスポンスの型定義
interface Session {
  user_id: string;
  sessions: {
    session_id: string;
    session_name: string;
  };
}

import axios from 'axios';

axios.defaults.baseURL = "http://13.113.241.111";
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
export const apiTest = async () => {
    const url = '/sessions';
    await axios.get<any>(url,
        { params: { user_id: 'hayle6080' } }
    ).then(res => {
        console.log(res.data)
    })
    .catch((err) => {
      console.log(err) // 失敗
    })
};