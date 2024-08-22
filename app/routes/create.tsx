import {
    Form,
    useNavigate
} from "@remix-run/react";
import { useState } from "react";

import { Box, Rating, Typography } from '@mui/material';

export default function Create() {
  // const { contact } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [year, setYear] = useState("2002"); //年
  const [month, setMonth] = useState("01"); //月
  const [day, setDay] = useState("12"); //日
  const [name, setName] = useState("Burger King");  //店名
  const [genre, setGenre] = useState("Hamburger");  //ジャンル
  const [rating, setRating] = useState(2);  //評価値
  const [errorMessage, setErrorMessage] = useState('');
  const YYYYWid = "100px";
  const MMDDWidth = "50px";

  const handleSubmit = async () => {
    const url = 'http://127.0.0.1:5000/api/create'; // 送信先のAPI URL
    var date = `${year}-${month}-${day}` 
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
      return true;  //リダイレクトさせる
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(error);
      return false; //リダイレクトさせない
    }
  }

  return (
    <div>
      <div>
      <h1>What did you eat?</h1>

      <h2>Date</h2>
      <h3>Year / Month / Day</h3>
      <input name="year" id="year" value={year} onChange={(e) => setYear(e.target.value)}
      style={{ width: YYYYWid }}required />{" 年 "}
      <input name="month" id="month" value={month} onChange={(e) => setMonth(e.target.value)}
      style={{ width: MMDDWidth }} required />{" 月 "}
      <input name="day" id="day" value={day} onChange={(e) => setDay(e.target.value)}
      style={{ width: MMDDWidth }} required />{" 日 "}
      
      <h2>Restaurant Name</h2>
      <input
        name="name"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required />
      
      <h2>Genre</h2>
      <input
        name="genre"
        id="genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}/>

      <h2>Rating</h2>
      <Box
        sx={{
          '& > legend': { mt: 2 },
        }}
      >
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={(event, newRating) => {
            if (newRating === null) {
              setRating(0)
            } else {
              setRating(newRating);
            }
            // setValue(newValue);
          }}
        />
      </Box>
      <br/>
      </div>

      <div>
        <Form
          action="/" 
          onSubmit={async (e) => {
          e.preventDefault(); // デフォルトのフォーム送信動作を防ぐ

          // handleSubmitを実行し、成功した場合のみフォーム送信
          const isSuccessful = await handleSubmit();
          if (isSuccessful) {
            e.target.submit(); // フォーム送信を手動でトリガー
          }
        }}>
          <button type="submit">Save</button>
        </Form>
        <p> </p>
        <Form action="/">
          <button type="submit">Back to Home</button>
        </Form>
      </div>
      <p>
        {/* エラーメッセージを表示させたい */}
        {/* {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}  */}
      </p>
    </div>
  );
}