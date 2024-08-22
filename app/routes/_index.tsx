
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

export default function Index() {
  const [year, setYear] = useState("2002");
  const [month, setMonth] = useState("01");
  const [day, setDay] = useState("12");

  // ボタン処理は同じところに書かないとinputのデータが利用できない
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
      console.log('Response from server:', responseData);
  
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
    return (
      <p>
        <h1>Year / Month / Day</h1>
        <input
        name="year"
        id="year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required />
        <input
        name="month"
        id="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        required />
        <input
        name="day"
        id="day"
        value={day}
        onChange={(e) => setDay(e.target.value)}
        required />
        {/* POSTするボタン */}
        <button onClick={DateSubmit}>Send Test</button>
        <Form action="create">
          <button type="submit">Add new report</button>
        </Form>

      </p>
    );
  }
  