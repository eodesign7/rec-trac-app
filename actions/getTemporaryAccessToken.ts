"use server";

// cSpell:disable

import { currentUser } from "@clerk/nextjs/server";
import { SchematicClient } from "@schematichq/schematic-typescript-node";

const apiKey = process.env.SCHEMATIC_API_KEY;
const client = new SchematicClient({ apiKey });

export async function getTemporaryAccessToken() {
  console.log("Getting temporary access token");
  const user = await currentUser();
  if (!user) {
    return null;
  }
  console.log(`Issuing access token for user:", ${user.id}`);

  const res = await client.accesstokens.issueTemporaryAccessToken({
    resourceType: "company",
    lookup: { id: user.id },
  });
  console.log("Response:", res.data ? "Token received" : "No token received");
  return res.data?.token;
}

// https://www.youtube.com/watch?v=iBFHWS8rbW4 -- 1:28:00
