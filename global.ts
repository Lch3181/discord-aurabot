import * as fs from 'fs'

/**
 * Executes a shell command and return it as a Promise.
 * limit output to 2000 character for discord slash command limit
 * @param syntax {string}
 * @return {Promise<string>}
 */
 export function execShellCommand(syntax: string) {
    const exec = require('child_process').exec;
    return new Promise((resolve, reject) => {
        exec(`${syntax}`, (error: any, stdout: string, stderr: string) => {
            if (error) {
                console.warn(error);
            }
            resolve(stdout ? stdout.substring(-2000) : stderr.substring(-2000));
        });
    });
}

export function delay(ms: number)
{
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function uploadmap(url: string, filename: string, config?: string) {
    const syntax = `wget -O \"${process.env.AURABOT_ADDRESS}/maps/${filename}\" \"${url}\"`

    //write config file
    if (config != null && config != "null") {
        const data = `map_path = maps\\${filename}\n` +
        `map_type =\n` +
        `map_localpath = ${filename}\n`
    
        fs.writeFile(`${process.env.AURABOT_ADDRESS}/mapcfgs/${config}.cfg`, data, 'utf8', error => {
            if (error) throw error
        })
    }
    
    //download map
    await execShellCommand(syntax)

    //get filesize for user to double check if correct
    const filesize = (await fs.promises.stat(`${process.env.AURABOT_ADDRESS}/maps/${filename}`)).size
    let output = (filesize/1024/1024).toPrecision(4)

    return new Promise<string>(resolve => {
        resolve(output)
    })
}