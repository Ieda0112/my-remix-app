import type { 
    ActionFunctionArgs,
    LoaderFunctionArgs
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
    Form,
    useLoaderData,
    useNavigate
} from "@remix-run/react";
import invariant from "tiny-invariant";

import { getContact, updateContact } from "../data";
import{ fetchPost } from "../pokedata";
import { useState } from "react";

import { Box, Rating, Typography } from '@mui/material';

export default function EditContact() {
  // const { contact } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const now = new Date
  const [date, setDate] = useState("2002-01-12"); //YYYY-MM-DD
  const [name, setName] = useState(now);
  const [genre, setGenre] = useState("Hamburg");
  const [value, setValue] = useState(2);

  const handleSubmit = async () => {
    const url = 'http://127.0.0.1:5000/api/create'; // 送信先のAPI URL
    const post = {
      "date":date,
      "name":name,
      "genre":genre,
      "rating":value //rating
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
    } catch (error) {
      console.error('Error:', error);
    }
    // return redirect(`/flaskr/${contact.id}`);
  }

  return (
    // <Form key={contact.id} id="contact-form" method="post">
    <div>
      <h1>What did you eat?</h1>

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

      <h2>Date</h2>
      <input
        name="date"
        id="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required />
      
      <h2>Rating</h2>
      <Box
        sx={{
          '& > legend': { mt: 2 },
        }}
      >
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            if (newValue === null) {
              setValue(0)
            } else {
              setValue(newValue);
            }
            // setValue(newValue);
          }}
        />
      </Box>

      <p>
        <Form action="/">
          <button onClick={handleSubmit}>Save</button>
        </Form>
        <button onClick={() => navigate(-1)} type="button">
            Cancel
        </button>
      </p>
    </div>
  );
}