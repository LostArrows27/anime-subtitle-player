import { NextResponse } from "next/server"
import Replicate from "replicate";
import fetch from 'node-fetch';

// let url = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/jfk.wav';

// async function runs(audioFileURL: string) {
//     try {
//         const replicate = new Replicate({
//             auth: "r8_Efujg15qrMl1zEVsw5rMeYkTHRD8lxm2yADsA",
//             fetch: fetch
//         });
//         console.log('Done replicate');
//         const output = await replicate.run(
//             "openai/whisper:91ee9c0c3df30478510ff8c8a3a545add1ad0259ad3a9f78fba57fbc05ee64f7",
//             {
//                 input: {
//                     audio: audioFileURL,
//                     language: "ja",
//                     transcription: "srt",
//                     model: 'large'
//                 },
//             }
//         );
//         return output;
//     } catch (err) {
//         console.log(err);
//     }
// }

export async function GET(request: Request) {
    // const result = await testTransformers();
    // const result = await runs('https://cbvwrikamnjrgcobbmii.supabase.co/storage/v1/object/public/avatar/hyouka.mp3')
    return NextResponse.json({ test: 1 });
}


