require("dotenv").config();

const Replicate = require("replicate");
const fs = require("fs");

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN
});

async function testEnhancer() {
    try {
        console.log("🚀 Starting Real-ESRGAN test...");
        console.log("⏳ First run may take longer while the model starts...");

        const output = await replicate.run(
            "xinntao/realesrgan:1b976a4d456ed9e4d1a846597b7614e79eadad3032e9124fa63859db0fd59b56",
            {
                input: {
                    img: "https://replicate.delivery/mgxm/18579112-081d-4449-8c71-277667b0c3c9/wolf_gray.jpg",
                    scale: 2,
                    tile: 0,
                    version: "General - RealESRGANplus",
                    face_enhance: false
                }
            }
        );

        console.log("✅ AI enhancement completed!");

        console.log("📸 Output URL:");
        console.log(output.url());

        console.log("🎉 Real-ESRGAN is working correctly.");
    } catch (error) {
        console.error("❌ Enhancement failed:");
        console.error(error.message);
    }
}

testEnhancer();