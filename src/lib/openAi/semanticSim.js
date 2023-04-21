import cosineSimilarity from "../math/cosineSimilarity";
import getEmbedding from "./getEmbedding";

export default async function semanticSim(str1, str2) {
    const emb1 = await getEmbedding(str1);
    const emb2 = await getEmbedding(str2);
    const sim = cosineSimilarity(emb1, emb2);

    return sim;
}