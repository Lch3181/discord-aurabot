import fs from 'fs';

export function watchFile(callback: (newLine: string) => void): void {
  const file = `${process.env.AURABOT_ADDRESS}/aura.log`;

  let lastPosition = fs.statSync(file).size; // Get the current size of the file

  const watcher = fs.watch(file, { encoding: 'utf-8' });

  watcher.on('change', (eventType, filename) => {
    if (eventType === 'rename') {
      // File has been renamed, do not take any action
      return;
    }

    const readStream = fs.createReadStream(file, {
      encoding: 'utf-8',
      start: lastPosition,
    });

    readStream.on('data', (data) => {
      const lines = (<string>data).split('\n').filter((line) => line.trim() !== ''); // Explicitly cast data to string
      if (lines.length > 0) {
        lastPosition += Buffer.byteLength(data); // Update the lastPosition based on the byte length of data
        const newestLine = lines[lines.length - 1];
        callback(newestLine); // Invoke the callback function with the newest line
      }
    });

    readStream.on('end', () => {
      readStream.close();
    });
  });
}
