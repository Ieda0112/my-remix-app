import type { 
    LoaderFunctionArgs
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
    useLoaderData,
    useNavigate
} from "@remix-run/react";
import invariant from "tiny-invariant";

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

const update = async (id, title, body) => {
    const url = 'http://127.0.0.1:5000/api/' + id + '/update'; // 送信先のAPI URL
    const post = {
      "id":id,
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
    return redirect(`/flaskr/${id}`);
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

  const submit = async () => {
    console.log("submit")
    await update(contact.id, title, body)
  }

  console.log(title)

  return (
    <div>
        <button onClick={() => console.log(1)}>ボタン</button>
      <p>
        <span>Title</span>
        <input
          name="title"
          id="title"
          value={title}
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          required />
      </p>
      <label>
        <span>Body</span>
        <textarea name="body" id="body"  rows={6} onChange={(e) => setBody(e.target.value)} value={body}></textarea>

      </label>
      <p>
        <button onClick={() => submit()}>Save</button>
        <button onClick={() => navigate(-1)} type="button">
            Cancel
        </button>
      </p>
    </div>
  );
}