import fs from 'node:fs/promises';
import path from 'node:path';
import { getPlaiceholder } from 'plaiceholder';

export async function getImageBlurData(src) {
    async function getBuffer() {
        if (src.startsWith('http')) {
            const res = await fetch(src);
            return Buffer.from(await res.arrayBuffer());
        } else {
            return await fs.readFile(path.join('./public', src));
        }
    }

    const imageBuffer = await getBuffer();
    const { base64 } = await getPlaiceholder(imageBuffer);
    return base64;
}
