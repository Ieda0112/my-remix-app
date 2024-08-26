import {
    Form,
    useNavigate
} from "@remix-run/react";
import { useState } from "react";

import { Box, Rating, Typography } from '@mui/material';

export default function Create() {
  // const { contact } = useLoaderData<typeof loader>();
  // const navigate = useNavigate();
  const [year, setYear] = useState("2002"); //年
  const [month, setMonth] = useState("01"); //月
  const [day, setDay] = useState("12"); //日
  const [name, setName] = useState("Burger King");  //店名
  const [genre, setGenre] = useState("Hamburger");  //ジャンル
  const [rating, setRating] = useState(2);  //評価値
  const [errors, setErrors] = useState(); //エラーメッセージ
  const YYYYWid = "100px";
  const MMDDWid = "50px";

  const handleSubmit = async () => {
    const url = 'http://127.0.0.1:5000/api/create'; // 送信先のAPI URL
    if(month.length === 1) setMonth(`0${month}`);
    if(day.length === 1) setDay(`0${day}`);
    var date = `${year}-${month}-${day}`;
    const post = {
      "date":date,
      "name":name,
      "genre":genre,
      "rating":rating //rating
    }
    try {
      if (!date) {
        throw new Error('日付を入れてください');
      }else if (!name) {
        throw new Error('店名を入れてください');
      }

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
      return [true, null];  //リダイレクトさせる
    } catch (error) {
      console.error('Error:', error);
      setErrors(error);
      return [false, error]; //リダイレクトさせない
    }
  }

  return (
    <div>
      <Form
        action="/" 
        onSubmit={async (e) => {
        e.preventDefault(); // デフォルトのフォーム送信動作を防ぐ

        // handleSubmitを実行し、成功した場合のみフォーム送信
        const [isSuccessful,error] = await handleSubmit();
        if (isSuccessful) {
          e.target.submit(); // フォーム送信を手動でトリガー
        }else{
          alert(error)
        }
      }}>
      <div>{/* 入力欄 */}
        <h1>What did you eat?</h1>
        <div>{/* 日付入力 */}
          <h2>{"Date (required)"}</h2>
          <h3>Year / Month / Day</h3>
          <input name="year" id="year" onChange={(e) => setYear(e.target.value)}
          placeholder={year}
          pattern="\d{4}" maxLength={4}
          style={{ width: YYYYWid }}
          required />{" 年 "}
          <input name="month" id="month" onChange={(e) => setMonth(e.target.value)}
          placeholder={month}
          pattern="\d{2}" maxLength={2}
          style={{ width: MMDDWid }}
          required/>{" 月 "}
          <input name="day" id="day" onChange={(e) => setDay(e.target.value)}
          placeholder={day}
          pattern="\d{2}" maxLength={2}
          style={{ width: MMDDWid }}
          required />{" 日 "}
        </div>
        <div>{/* 店名入力 */}
          <h2>{"Restaurant Name (required)"}</h2>
          <input
            name="name" id="name" placeholder={name}
            onChange={(e) => setName(e.target.value)}
            required />
        </div>
        <div>{/* ジャンル入力 */}
          <h2>Genre</h2>
          <input
            name="genre" id="genre" placeholder={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>
        <div>{/* 評価入力 */}
          <h2>Rating</h2>
          <Box sx={{'& > legend': { mt: 2 },}} >
            <Rating
              name="rating" value={rating}
              onChange={(event, newRating) => {
                if (newRating === null) {
                  setRating(0)
                } else {
                  setRating(newRating);
                }
                // setRating(newValue);
              }}
            />
          </Box>
        </div>
      </div>
      <br/>
          <button type="submit">Save</button>
        </Form>
        <p> </p>
        <Form action="/">
          <button type="submit">Back to Home</button>
        </Form>
      <p>
        {/* エラーメッセージを表示させたい */}
        {/* {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}  */}
      </p>
    </div>
  );
}