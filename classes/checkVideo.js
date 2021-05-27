const child_process = require("child_process")
const readline = require("readline")
const ffprobeStatic = require('ffprobe-static')
module.exports = async (url) => {
    //console.log(url)
    return new Promise((resolve, reject) => {
        let ffprobeProcess = child_process.spawn(ffprobeStatic.path, [
            "-v",
            "error",
            "-show_entries",
            "frame=width,height,pix_fmt", // Check the frame width, height, and pix_fmt
            "-select_streams",
            "v",
            "-of",
            "csv=p=0",
            url
        ])
        let rli = readline.createInterface({
            input: ffprobeProcess.stdout
        })
        let lastLine = null
        rli.on("line", line => {
            //console.log(line)
            if (line === "") return // Sometimes ffprobe outputs empty lines which can be safely ignored.
            if (line !== lastLine && lastLine !== null) {
                reject("crasher") // Crasher!
                ffprobeProcess.kill()
            }
            lastLine = line
        })
        rli.once("close", () => {
            resolve("safe") // Video completely checked
        })
    //}).catch(function(error){
     //   console.error(error)
    })
}

// CREDIT WHERE CREDIT IS DUE
// This is adapted from u/T1J8r's code on r/discordapp
