
const fs = require("fs");
fs.writeFile("message.txt", "Hello from NodeJS!", (err)=>{
    if(err)throw err;
        console.log("File have been saved");
} )

fs.readFile("./message.txt" , (err, data)=>{
    if(err)throw err;
    const buffer = Buffer.from(data).toString();
    console.log(buffer);
})