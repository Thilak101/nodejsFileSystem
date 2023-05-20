const express = require("express")
const fs = require("fs")
const path = require("path")
const PORT = process.env.PORT || 4000


const app = express()


const filePath = path.join(__dirname, "timeStamp")


app.get("/", (req, res) => {

    // get date

    const currentDate = new Date()

    const currentDay = currentDate.getDate()
    const currentMonth = currentDate.getMonth() + 1
    const currentYear = currentDate.getFullYear()

    // get time 

    let amOrPm = "AM"
    let hours = currentDate.getHours()
    if (hours > 12) {
        amOrPm = "PM"
    }
    if (hours == 0) {
        hours = 12;
    }
    if (hours > 12) {
        hours = hours - 12;

    }
    hours < 10 ? hours = `0${hours}` : hours


    let mins = currentDate.getMinutes()
    mins < 10 ? mins = `0${mins}` : mins

    let sec = currentDate.getSeconds()
    sec < 10 ? sec = `0${sec}` : sec

    // create time stamp

    const dateString = `${currentDay}/${currentMonth}/${currentYear}/${amOrPm}`
    const time = `${hours}-${mins}-${sec}`
    const timeStamp = `Time: ${time}, Date: ${dateString}`


    // create file on time stamp folder

    fs.writeFile(path.join(filePath, "date.txt"), timeStamp, (err) => {
        if (err) {
            console.log(err)
            return
        }
    })
    res.send("Time stamp file was created in timeStamp folder")
    res.end()
})


// this route is read date.txt file from timeStamp folder

app.get("/read", (req, res) => {
    fs.readdir(path.join(filePath), 'utf-8', (err, data) => {
        if (err) {
            console.log(err)
            return
        }

        console.log(data)
        data.forEach(file => {
            fs.readFile(path.join(__dirname, "timeStamp", file), 'utf-8', (err, content) => {
                if (err) {
                    console.log(err)
                    return
                }

                console.log(content)

            })
        })
    })

})





app.listen(PORT, () => console.log("server was started on " + PORT))