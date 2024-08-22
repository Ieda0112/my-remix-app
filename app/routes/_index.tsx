
import {
  Form,
  Link,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import appStylesHref from "./app.css?url";
import{ useEffect,useState } from "react";
import { colors } from "@mui/material";


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

export default function Index() {
  const [year, setYear] = useState("2002");
  const [month, setMonth] = useState("01");
  const [day, setDay] = useState("12");
  const YYYYWid = "100px";
  const MMDDWidth = "50px";
  const [dailyPosts, setDailyPosts] = useState<any[]>([]);

  // ボタン処理関数　inputのデータを外に飛ばす
  const DateSubmit = async () => {
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
  useEffect(() => {
    const fetchData = async () => {
      const posts = await DateSubmit(); // fetchRecently を呼び出し
      if(posts)  setDailyPosts(posts.daily_data);
    };
    fetchData(); // データをフェッチする
  }, []);
  const handleDelete = async (id:number) =>{
    await Delete(id);
  }

  
    return (
      <div>
        <div>
        <h2>Year / Month / Day</h2>
        <input name="year" id="year" value={year} onChange={(e) => setYear(e.target.value)}
        style={{ width: YYYYWid }} required />{" 年 "}
        <input name="month" id="month" value={month} onChange={(e) => setMonth(e.target.value)}
        style={{ width: MMDDWidth }} required />{" 月 "}
        <input name="day" id="day" value={day} onChange={(e) => setDay(e.target.value)}
        style={{ width: MMDDWidth }} required />{" 日 "}
        <button onClick={DateSubmit}>Send Test</button> {/* POSTするボタン */}
        </div>
        <div>
        <Form action="create">
          <button type="submit">Add new report</button>
        </Form>
        </div>

        <h1>{year}/{month}/{day}</h1>
        <h2>Name / Genre / Rating</h2>
          <ul>
            {dailyPosts.map((post) => (
              <li key={post.id}>
                <h3>{post.name} / {post.genre} /
                {Array.from({ length: post.rating }, (_, index) => (
                            <span key={index}> ⭐️</span>
                ))}
                {post.rating}
                <button onClick={()=>handleDelete(post.id)} style={{marginLeft: '50px', color:'red'} }>Delete</button>
                </h3>
              </li>
            ))}
          </ul>
      </div>
    );
  }
  