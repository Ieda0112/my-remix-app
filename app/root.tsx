import type {
  LinksFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import{json, redirect} from "@remix-run/node"
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
import { createEmptyContact, getContacts } from "./data";
import{ useEffect } from "react";
import{ fetchPoke } from "./pokedata"


export const action = async () => {
  const contact = await createEmptyContact();
  return redirect(`/contacts/${contact.id}/edit`);
};
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];
export async function fetchPostlist() {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/');
    if (!response.ok) {
      throw new Error('ネットワークエラー: ' + response.status);
    }
    const data = await response.json();

    console.log(data)
    
    return data;

  } catch (error) {
    console.error('問題が発生しました。', error); // エラーが発生した場合の処理
  }
}


export default function App() {
  // const { pokeList } = useLoaderData<typeof loader>();
  var date = null;
  const handleSubmit = async () => {
    var date = null;
    const url = 'http://127.0.0.1:5000/api/'; // 送信先のAPI URL
    const post = {
      "date":date
    }
    try {
      const response = await fetch(
        url, {
        method: 'POST',
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
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div
          id="detail"
        >
        {/* <button onClick={handleSubmit}>Add</button>
        <Form action="create">
          <button type="submit">Edit</button>
        </Form> */}
          <Outlet />
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
