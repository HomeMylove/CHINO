const sharp = require('sharp')




const test = async ()=>{
    const width = 991
    const height = 608
    const star = "★★★★★★"

    const svgImage = `
        <svg width="${width}" height="${height}">
        <style>
        <font>
        <font-face font-family="SimSun SimHei YouYuan"/>
        </font>
        .star{
            fill:gold;
            font-size:80px;
            font-weight:400;
            font-family:"SimHei";
        }
        </style>
        <text x="10%" y="100" text-anchor="middle" class="star">${star}</text>
        </svg>
        `
    const svgBuffer = Buffer.from(svgImage)

 await sharp('bg.png')
     .composite([{
         input:svgBuffer,
         left:0,
         top:0
     }])
     .toFile("hello.png")

}


test()