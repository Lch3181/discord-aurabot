
/**
 * Executes a shell command and return it as a Promise.
 * limit output to 2000 character for discord slash command limit
 * @param cmd {string}
 * @return {Promise<string>}
 */
 export function execShellCommand(cmd: any) {
    const exec = require('child_process').exec;
    return new Promise((resolve, reject) => {
        exec(`${cmd} | head -c2000`, (error: any, stdout: unknown, stderr: unknown) => {
            if (error) {
                console.warn(error);
            }
            resolve(stdout ? stdout : stderr);
        });
    });
}