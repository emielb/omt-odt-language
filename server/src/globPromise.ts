import { glob } from "glob";

/**
 * Use the glob function as a Promise.
 * @returns A promise resolving in a `string[]` or reject when an error occurred.
 * @param pattern the pattern for the glob filtering
 */
export function globPromise(pattern: string): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
        glob(pattern, (err, matches) => {
            if (err) {
                reject(err);
            } else {
                resolve(matches)
            }
        });
    })
}
