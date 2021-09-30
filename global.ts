
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
            resolve(stdout ? stdout.substr(-2000) : stderr.substr(-2000));
        });
    });
}
