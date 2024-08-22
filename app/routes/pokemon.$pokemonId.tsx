import type {
    ActionFunctionArgs,
    LoaderFunctionArgs,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import{ fetchPoke } from "../pokedata";

export const loader = async ({
    params,
}: LoaderFunctionArgs) => {
    invariant(params.pokemonId, "Missing contactId param");
    const pokedata = await fetchPoke(params.pokemonId);
    if (!pokedata) {
        throw new Response("Not Found", { status: 404 });
    }
    return json({pokedata});
};

export default function Pokepage(){
    const {pokedata} = useLoaderData<typeof loader>();
    return(
    <div id="pokedata">
        <div>
            <img
                alt={`${pokedata.name} front`}//表示画像の名前
                key={pokedata.front}
                src={pokedata.front}//表示画像のURL
            />
        </div>
        <div>
            <h1>
                No.{pokedata.id}{"  "}
                {pokedata.name ?(
                    <>
                        {pokedata.name}
                    </>
                ):(
                    <i>No Name</i>
                )}{" "}
            </h1>
        </div>
        <div>
            <h1>
                No.{pokedata.id}{"  "}
                {pokedata.name ?(
                    <>
                        {pokedata.name}
                    </>
                ):(
                    <i>No Name</i>
                )}{" "}
            </h1>
        </div>

        <div>

        </div>
    </div>
    )
}

/*
export const loader = async ({//API先からデータをロードしてくる
    request,
  }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const contacts = await getContacts(q);
    const pokeList = []
    for(let i=1;i<=151;i++){
      const p = await fetchPoke(String(i))
      if (p) {
        pokeList.push(p);
      }
    }
    return json({ contacts, q, pokeList });
  };

*/

/*
for(let i=1;i<=151;i++){
    const p = await fetchPoke(String(i));
    if (p) {
    pokeList.push(p);
    }
}*/