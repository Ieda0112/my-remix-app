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

export const loader = async ({
  params,
}: LoaderFunctionArgs) => {
  invariant(params.postId, "Missing postId param");
  const contact = await fetchPost(params.postId);
  if (!contact) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ contact });
};


// export const sendAPI = async ({
//   params,
//   request,
// }: ActionFunctionArgs) => {
//   invariant(params.postId, "Missing postId param");
//   const url = 'http://127.0.0.1:5000/api/posts/'+params.postID+'/update'; // 送信先のAPI URL
//   const data = await request.formData();
//   try {
//     const response = await fetch(url, {
//       method: 'POST', // HTTPメソッド（POST, PUT, PATCHなど）
//       body: JSON.stringify(data), // JavaScriptオブジェクトをJSON文字列に変換して送信
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const responseData = await response.json(); // APIからのレスポンスをJSON形式で取得
//     console.log('Response from server:', responseData);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }


export default function EditContact() {
  const { contact } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const [title, setTitle] = useState(contact.title)
  const [body, setBody] = useState(contact.body)

  const handleSubmit = async () => {
    console.log("hoge")
    const url = 'http://127.0.0.1:5000/api/'+contact.id+'/update'; // 送信先のAPI URL
    const post = {
      "id":contact.id,
      "title":title,
      "body":body
    }
    try {
      const response = await fetch(
        url, {
        method: 'POST', // HTTPメソッド（POST, PUT, PATCHなど）
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
      <p>
        <span>Title</span>
        <input
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required />
      </p>
      <label>
        <span>Body</span>
        <textarea name="body" id="body"  rows={6} value={body} onChange={(e) => setBody(e.target.value)}></textarea>

      </label>
      <p>
        <button onClick={handleSubmit}>Save</button>
        <button onClick={() => navigate(-1)} type="button">
            Cancel
        </button>
      </p>
      </div>
  );
}