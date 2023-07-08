import express from "express"
import axios from "axios"
import bodyParser from "body-parser"
import cors from "cors"

const app = express()
app.use(cors()) // Cors middleware is required
app.use(bodyParser.json()) // Body parser middleware is required
const PORT = process.env.PORT || 5000

// Extracts the video ID from the YouTube URL
function extractVideoId(url) {
	const urlObject = new URL(url)
	const searchParams = new URLSearchParams(urlObject.search)
	const videoId = searchParams.get("v")
	/*
	  videoId.split("&")[0] will split the videoId string into an array of substrings by the "&" character and return the first substring, which is the actual video ID. If there are no "&" characters in the videoId string, it will return the whole string.
	*/
	return videoId ? videoId.split("&")[0] : null
}

// Endpoint to retrieve YouTube thumbnail
app.post("/grab", async (req, res) => {
	const { url } = req.body

	// Extract video ID from the YouTube URL
	const videoId = extractVideoId(url)

	if (!videoId) {
		res.status(400).send("Invalid YouTube URL")
		return
	}

	try {
		const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
		res.status(200).json(thumbnailUrl)
	} catch (error) {
		console.error("Error fetching thumbnail:", error)
		res.status(500).send("Error fetching thumbnail")
	}
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})

// https://www.youtube.com/watch?v=kfGKWh_ZF8Q
