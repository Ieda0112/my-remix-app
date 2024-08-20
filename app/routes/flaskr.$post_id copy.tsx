import type {
    ActionFunctionArgs,
    LoaderFunctionArgs,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import{ fetchPost } from "../pokedata";

export const loader = async ({
    params,
}: LoaderFunctionArgs) => {
    invariant(params.post_id, "Missing contactId param");
    const pokedata = await fetchPost(params.post_id);
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
            <h1>
                Post No.{pokedata.id}
            </h1>
        </div>
        <div><h1>{pokedata.title}</h1></div>
        <div>
            <i>
                written by Author.{pokedata.author_id}{"   "}
                on  {pokedata.created}
            </i>
        </div>
        <div>
            <h3>
                {pokedata.body}
            </h3>
        </div>
        <div>
        </div>
    </div>
    )
}