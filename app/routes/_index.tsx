
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


export const Delete = async (id:number, year:string, month:string, day:string) => {
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

export default function Index() {
  const [year, setYear] = useState("2002");
  const [month, setMonth] = useState("01");
  const [day, setDay] = useState("12");
  const [date, setDate] = useState(`${year}年　${month}月　${day}日`);
  const YYYYWid = "100px";
  const MMDDWidth = "50px";
  const [dailyPosts, setDailyPosts] = useState<any[]>([]);

 
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const posts = await DateSubmit(); // fetchRecently を呼び出し
  //     if(posts)  setDailyPosts(posts.daily_data);
  //   };
  //   fetchData(); // データをフェッチする
  // }, []);

  // ボタン処理関数　inputのデータを外に飛ばす
  const handleDateSubmit = async (year:string, month:string, day:string) =>{
    const responseData = await DateSubmit(year,month,day)
    if(responseData)  setDailyPosts(responseData.daily_data); //dailyPostsに取得したデータを入れる
    setDate(`${year}年　${month}月　${day}日`)  //表示する日付を変える
  }
  const handleDelete = async (id:number) =>{
    await Delete(id,year,month,date);
    const responseData = await DateSubmit(year,month,day)
    if(responseData)  setDailyPosts(responseData.daily_data); //dailyPostsに取得したデータを入れる
  }

  
    return (
      <div>
        <div style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)"}}>
          <h2>Year</h2> <h2>Month</h2>  <h2>Day</h2> <div></div>
          <div>
            <input
              name="year" id="year" value={year} onChange={(e) => setYear(e.target.value)}
              style={{ width: YYYYWid }} required />
            {" 年 "}
          </div>
          <div>
            <input
              name="month" id="month" value={month} onChange={(e) => setMonth(e.target.value)}
              style={{ width: MMDDWidth }} required />
            {" 月 "}
          </div>
          <div>
            <input
              name="day" id="day" value={day} onChange={(e) => setDay(e.target.value)}
              style={{ width: MMDDWidth }} required />
            {" 日 "}
          </div>
          <div>
            <button onClick={() => handleDateSubmit(year,month,day)} style={{float: "right"}}>Search</button>
          </div>
        </div>
        <div>
        <Form action="create">
          <button type="submit">Add New Report</button>
        </Form>
        </div>
        <h2>{date}</h2>
        <div style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)"}}>
          <h2>Name</h2>  <h2>Genre</h2>  <h2>Rating</h2>
        </div>
        {dailyPosts.map((post) => (
          <div style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)"}}>
            <h4>{post.name}</h4>
            <h4>{post.genre}</h4>
            <h4>{Array.from({ length: post.rating }, (_, index) => (
                        <span key={index}> ⭐️</span>
            ))}</h4>
            <h4>
              <button
                onClick={() => handleDelete(post.id)}
                style={{float: "right", color: "red"}}>
                Delete
              </button>
            </h4>
          </div>
        ))}
      </div>
    );
  }
  