//日付を送り、その日の投稿一覧を得る
export  const DateSubmit = async (year:string, month:string, day:string) => {
    const url = 'http://127.0.0.1:5000/api/daily'; // 送信先のAPI URL
    var date = `${year}-${month}-${day}`
    const post = {
      "date":date
    }
    try {
      const response = await fetch(
        url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json", //JSONを送ることを明示
        },
        body: JSON.stringify(post), // JavaScriptオブジェクトをJSON文字列に変換して送信
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json(); // APIからのレスポンスをJSON形式で取得
      return responseData;
  
    } catch (error) {
      console.error('Error:', error);
    }
}

//投稿IDを送り、その投稿を削除する
export const Delete = async (id:number) => {
    const url = 'http://127.0.0.1:5000/api/delete'; // 送信先のAPI URL
    const post = {
        "id" : id
    }
    try {
        const response = await fetch(
        url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post), // JavaScriptオブジェクトをJSON文字列に変換して送信
        });

        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json(); // APIからのレスポンスをJSON形式で取得
        console.log('Response from server:', responseData);
        return responseData;
    } catch (error) {
        console.error('Error:', error);
    }
}